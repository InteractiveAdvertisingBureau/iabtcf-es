/**
 * @class representing a collection of data
 */
class CmpApiModel {
    constructor() {
        // @type {?TCString}
        this.tcString = null;
        // @type {boolean}
        this.hasGlobalScope = null;
        ;
        // @type {boolean}
        this.gdprApplies = null;
        // @type {boolean}
        this.gdprAppliesGlobally = null;
        // @type {GVL}
        this.gvl = null;
    }
    static setTCString(tcString) {
    }
}
export { CmpApiModel };
