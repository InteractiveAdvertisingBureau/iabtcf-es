class PurposeVector {
    constructor() {
        this.map = new Map();
    }
    setPurpose(purposeId, value) {
        this.map.set(purposeId, value);
    }
    getPurpose(purposeId) {
        if (this.map && this.map.has(purposeId)) {
            return this.map.get(purposeId) || false;
        }
        else {
            throw new RangeError(`Purpose id ${purposeId} does not exist`);
        }
    }
}
export { PurposeVector };
