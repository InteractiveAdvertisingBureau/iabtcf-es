import {ConsentLanguages} from '../../src/model/ConsentLanguages';
import {expect} from 'chai';

describe('model->ConsentLanguages', (): void => {

  it('should have only these languages', (): void => {

    const consentLanguages = new ConsentLanguages();
    const languages = [
      'EN',
      'BG',
      'CS',
      'DA',
      'DE',
      'EL',
      'ES',
      'ET',
      'FI',
      'FR',
      'GA',
      'HR',
      'HU',
      'IT',
      'LT',
      'LV',
      'MT',
      'NL',
      'PL',
      'PT',
      'RO',
      'SK',
      'SL',
      'SV',
    ];

    expect(consentLanguages.size, 'size').to.equal(languages.length);
    languages.forEach((lang: string): void => {

      expect(consentLanguages.has(lang), 'has').to.be.true;

    });

  });

});
