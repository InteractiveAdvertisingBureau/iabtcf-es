/* eslint-disable @typescript-eslint/no-explicit-any */
import {CmpApiModel} from './CmpApiModel';
import {CustomCommands} from './CustomCommands';
import {CmpStatus, DisplayStatus, EventStatus} from './status';
import {CallResponder} from './CallResponder';
import {TCString, Base64Url, Segment, SegmentIDs, TCModel} from '@iabtcf/core';

/**
 * Consent Management Platform API
 *
 * This is the only class that the CMP should create and interface with to set data for commands to utilize.
 */
export class CmpApi {

  private callResponder: CallResponder;
  private isServiceSpecific: boolean;

  /**
   * @param {number} cmpId - IAB assigned CMP ID
   * @param {number} cmpVersion - integer version of the CMP
   * @param {boolean} isServiceSpecific - whether or not this cmp is configured to be service specific
   * @param {CustomCommands} [customCommands] - custom commands from the cmp
   */
  public constructor(cmpId: number, cmpVersion: number, isServiceSpecific = false, customCommands?: CustomCommands) {

    this.throwIfInvalidInt(cmpId, 'cmpId', 2);
    this.throwIfInvalidInt(cmpVersion, 'cmpVersion', 0);

    CmpApiModel.cmpId = cmpId;
    CmpApiModel.cmpVersion = cmpVersion;
    this.isServiceSpecific = !!isServiceSpecific;
    this.callResponder = new CallResponder(customCommands);

  }

  public set tcModel(tcModel: TCModel | null) {

    // eslint-disable-next-line no-console
    console.error('@iabtcf/cmpapi: As of v1.0.0-beta.21 setting tcModel via CmpApi.tcModel is deprecated.  Use cmpApi.update(tcString, uiVisible) instead');
    // eslint-disable-next-line no-console
    console.log('  see: https://github.com/InteractiveAdvertisingBureau/iabtcf-es/tree/master/modules/cmpapi#cmpapi-examples');

  }

  public set tcString(tcString: string | null) {

    // eslint-disable-next-line no-console
    console.error('@iabtcf/cmpapi: As of v1.0.0-beta.21 setting tcString via CmpApi.tcString is deprecated.  Use cmpApi.update(tcString, uiVisible) instead');
    // eslint-disable-next-line no-console
    console.log('  see: https://github.com/InteractiveAdvertisingBureau/iabtcf-es/tree/master/modules/cmpapi#cmpapi-examples');

  }

  public set uiVisible(bool: boolean) {

    // eslint-disable-next-line no-console
    console.error('@iabtcf/cmpapi: As of v1.0.0-beta.21 setting uiVisible via CmpApi.uiVisible is deprecated.  Use cmpApi.update(tcString, uiVisible) instead');
    // eslint-disable-next-line no-console
    console.log('  see: https://github.com/InteractiveAdvertisingBureau/iabtcf-es/tree/master/modules/cmpapi#cmpapi-examples');

  }

  private throwIfInvalidInt(value: number, name: string, minValue: number): void | never {

    if (!(typeof value === 'number' && Number.isInteger(value) && value >= minValue)) {

      throw new Error(`Invalid ${name}: ${value}`);

    }

  }

  /**
   * throwMaybe - checks to make sure the value is null or an encoded string is
   * passed with a publisher TC segment which is required in the CMP API.  It
   * also checks to see if the we are disabled
   *
   * @param {string} str - value to check
   */
  private throwMaybe(str: string): void {

    let valid = (str === null || str === '');

    if (CmpApiModel.disabled) {

      throw new Error('CmpApi Disabled');

    }

    if (!valid && typeof str === 'string' && !!~str.indexOf('.')) {

      const segments = str.split('.');
      let hasPubTC = false;

      segments.forEach((segment: string): void => {

        if (!hasPubTC) {

          const segNumber = parseInt(Base64Url.decode(segment.charAt(0)).substr(0, 3), 2);
          hasPubTC = (segNumber === SegmentIDs.KEY_TO_ID[Segment.PUBLISHER_TC]);

        }

      });

      valid = hasPubTC;

    }

    if (!valid) {

      CmpApiModel.cmpStatus = CmpStatus.ERROR;
      throw new Error(`Invalid string: ${str}! If encoded with @iabtcf/core, please make sure the it is encoded with TCString.encode(tcModel, {isForVendors:true}) encoding option`);

    }

  }

  /**
   * update - When the state of a CMP changes this function should be called
   * with the updated tc string and whether or not the UI is visible or not
   *
   * @param {string|null} encodedTCString - set a string to signal that
   * gdprApplies and that an encoded tc string is being passed.  If GDPR does
   * not apply, set to null.
   * @param {boolean} uiVisible - default false.  set to true if the ui is
   * being shown with this tc string update, this will set the correct values
   * for eventStatus and displayStatus.
   * @return {void}
   */
  public update(encodedTCString: string | null, uiVisible = false): void {

    this.throwMaybe(encodedTCString);

    CmpApiModel.cmpStatus = CmpStatus.LOADED;

    if (uiVisible) {

      CmpApiModel.displayStatus = DisplayStatus.VISIBLE;
      CmpApiModel.eventStatus = EventStatus.CMP_UI_SHOWN;

    } else {

      if (CmpApiModel.tcModel === undefined) {

        CmpApiModel.displayStatus = DisplayStatus.DISABLED;
        CmpApiModel.eventStatus = EventStatus.TC_LOADED;

      } else {

        CmpApiModel.displayStatus = DisplayStatus.HIDDEN;
        CmpApiModel.eventStatus = EventStatus.USER_ACTION_COMPLETE;

      }

    }

    if (encodedTCString === null) {

      CmpApiModel.gdprApplies = false;
      CmpApiModel.tcModel = null;

    } else {

      CmpApiModel.gdprApplies = true;

      if (encodedTCString === '') {

        CmpApiModel.tcModel = new TCModel();
        CmpApiModel.tcModel.cmpId = CmpApiModel.cmpId;
        CmpApiModel.tcModel.cmpVersion = CmpApiModel.cmpVersion;

      } else {

        CmpApiModel.tcModel = TCString.decode(encodedTCString);

      }

      CmpApiModel.tcModel.isServiceSpecific = this.isServiceSpecific;
      CmpApiModel.tcString = encodedTCString;

    }

    if (CmpApiModel.displayStatus !== DisplayStatus.VISIBLE) {

      CmpApiModel.eventQueue.exec();

    }

    this.callResponder.purgeQueuedCalls();

  }

  /**
   * Disables the CmpApi from serving anything but ping and custom commands
   * Cannot be undone
   */
  public disable(): void {

    CmpApiModel.disabled = true;
    CmpApiModel.cmpStatus = CmpStatus.ERROR;

  }

}
