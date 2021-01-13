/**
 * EventStatus enum represents the possible values of the eventStatus property of the TCData
 */
export enum EventStatus {
  /**
   * A CMP is loaded and is prepared to surface a TC String to any calling scripts on the page
   * @type {string}
   */
  TC_LOADED = 'tcloaded',
  /**
   * The UI is surfaced or re-surfaced
   * And TC String is available and has rendered "Transparency" in accordance with the TCF Policy.
   * @type {string}
   */
  CMP_UI_SHOWN = 'cmpuishown',
  /**
   * User has confirmed or re-confirmed their choices in accordance with TCF Policy
   * and a CMP is prepared to respond to any calling scripts with the corresponding TC String.
   * @type {string}
   */
  USER_ACTION_COMPLETE = 'useractioncomplete',
}
