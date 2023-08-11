import {XMLHttpTestTools} from '@iabtechlabtcf/testing';
import {GVL} from '../src/GVL';

/**
 * MochaHooks.
 * This object specifies hooks that must run before or after every test in every file.
 * https://mochajs.org/#root-hook-plugins
 */
export const mochaHooks = {
    beforeEach(done) {
        XMLHttpTestTools.beforeEach();
        GVL.emptyCache();
        GVL.emptyLanguageCache();

        done();
    },
    afterEach(done) {
        /**
         * remove anything added to the body
         */

        for (let i = 0; i < document.body.children.length; i++) {

            const ele = document.body.children.item(i);

            ele.parentNode.removeChild(ele);

        }

        done();
    }
};