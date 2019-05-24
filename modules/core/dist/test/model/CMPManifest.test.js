import { expect } from 'chai';
import { CMPManifest } from '../../src/model/CMPManifest';
describe('CMPManifest Tests', () => {
    it('is valid when everything is set correctly through constructor', () => {
        const cmpManifest = new CMPManifest(2, 1);
        expect(cmpManifest.isValid()).to.be.true;
    });
    it('is isn\'t valid when cmp id = 1 when set in constructor', () => {
        const cmpManifest = new CMPManifest(1, 1);
        expect(cmpManifest.isValid()).to.be.false;
    });
    it('is isn\'t valid when no values are set', () => {
        const cmpManifest = new CMPManifest();
        expect(cmpManifest.isValid()).to.be.false;
    });
    it('is isn\'t valid when only cmp id is set to a valid value when set in constructor', () => {
        const cmpManifest = new CMPManifest(2);
        expect(cmpManifest.isValid()).to.be.false;
    });
    it('is valid when everything is set correctly through mutators', () => {
        const cmpManifest = new CMPManifest();
        cmpManifest.setCmpId(2);
        cmpManifest.setCmpVersion(1);
        expect(cmpManifest.isValid()).to.be.true;
    });
    it('is isn\'t valid when only cmp id is set to a valid value when set in mutator', () => {
        const cmpManifest = new CMPManifest();
        cmpManifest.setCmpId(2);
        expect(cmpManifest.isValid()).to.be.false;
    });
});
