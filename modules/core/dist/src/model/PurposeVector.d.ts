declare class PurposeVector {
    private map;
    constructor();
    setPurpose(purposeId: number, value: boolean): void;
    getPurpose(purposeId: number): boolean | never;
}
export { PurposeVector };
