import {CmpStatus, DisplayStatus} from './status';

/**
 * Settings used within the cmp api
 */
export const settings = {
  apiVersion: 2,
  tcfPolicyVersion: 3,
  defaults: {
    cmpStatus: CmpStatus.LOADING,
    displayStatus: DisplayStatus.HIDDEN,
    eventStatus: undefined,
  },

};
