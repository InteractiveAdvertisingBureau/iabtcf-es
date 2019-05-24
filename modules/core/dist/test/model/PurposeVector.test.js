import { expect } from 'chai';
import { PurposeVector } from '../../src/model/PurposeVector';
describe('PurposeVector Tests', () => {
    it('sets a purpose boolean', () => {
        const purposeVector = new PurposeVector();
        const purposeId = 1;
        purposeVector.setPurpose(purposeId, true);
        expect(purposeVector.getPurpose(purposeId)).to.be.true;
    });
    it('should throw an error if a purpose id hasn\'t been set yet', () => {
        const purposeVector = new PurposeVector();
        const purposeId = 1;
        expect(purposeVector.getPurpose.bind(purposeVector, purposeId)).to.throw(RangeError, /does not exist/);
    });
});
