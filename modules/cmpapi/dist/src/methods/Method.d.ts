/**
 * @classdesc Abstract class for CMP API methods
 * @class
 */
declare class Method {
    /**
     * @constructor
     *
     * @param {function} callback - method to be invoked when Method completes
     * its work
     * @typedef CmpApiModel
     * @param {CmpApiModel} model
     * @return {undefined}
     */
    constructor(callback: any, model: any);
    /**
     * allAreDefined
     *
     * @protected
     * @param {any} [...items] - items to check
     * @return {boolean}
     */
    allAreDefined(...items: any[]): boolean;
}
export { Method };
