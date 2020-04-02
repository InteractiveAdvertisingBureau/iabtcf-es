import {ConsentLanguages} from '../../src/model/ConsentLanguages';
import {expect} from 'chai';

describe('model->ConsentLanguages', (): void => {

  it('should have only these languages', (): void => {

    const consentLanguages = new ConsentLanguages();
    const languages = [
      'BG',
      'CA',
      'CS',
      'DA',
      'DE',
      'EL',
      'EN',
      'ES',
      'ET',
      'FI',
      'FR',
      'HR',
      'HU',
      'IT',
      'LT',
      'LV',
      'MT',
      'NL',
      'NO',
      'PL',
      'PT',
      'RO',
      'RU',
      'SK',
      'SL',
      'SV',
      'ZH',
    ];

    expect(consentLanguages.size, 'size').to.equal(languages.length);
    languages.forEach((lang: string): void => {

      expect(consentLanguages.has(lang), 'has').to.be.true;

    });

  });

});
