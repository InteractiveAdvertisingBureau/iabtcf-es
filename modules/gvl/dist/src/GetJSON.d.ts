/**
 * @class
 */
declare class GetJSON {
    /**
     * @param {string} jsonURL
     * @param {number} [timeout] - optional timeout in miliseconds
     * @return {Promise} - resolves with parsed JSON
     */
    static get(jsonURL: string, timeout?: number): Promise<object>;
}
export { GetJSON };
