export class ConsentLanguages {

  private static readonly langSet: Set<string> = new Set([
    'AR',
    'BG',
    'BS',
    'CA',
    'CS',
    'CY',
    'DA',
    'DE',
    'EL',
    'EN',
    'ES',
    'ET',
    'EU',
    'FI',
    'FR',
    'GL',
    'HE',
    'HI',
    'HR',
    'HU',
    'ID',
    'IS',
    'IT',
    'JA',
    'KA',
    'KO',
    'LT',
    'LV',
    'MK',
    'MS',
    'MT',
    'NL',
    'NO',
    'PL',
    'PT-BR',
    'PT-PT',
    'RO',
    'RU',
    'SK',
    'SL',
    'SQ',
    'SR-LATN',
    'SR-CYRL',
    'SV',
    'SW',
    'TH',
    'TL',
    'TR',
    'UK',
    'VI',
    'ZH',
    'ZH-HANT',
  ]);

  public has(key: string): boolean {

    return ConsentLanguages.langSet.has(key);

  }

  public parseLanguage(lang: string): string {

    lang = lang.toUpperCase();
    const primaryLanguage = lang.split('-')[0];

    if (lang.length >= 2 && primaryLanguage.length == 2) {

      if (ConsentLanguages.langSet.has(lang)) {

        return lang;

      } else if (ConsentLanguages.langSet.has(primaryLanguage)) {

        return primaryLanguage;

      }

      const fullPrimaryLang = primaryLanguage + '-' + primaryLanguage;

      if (ConsentLanguages.langSet.has(fullPrimaryLang)) {

        return fullPrimaryLang;

      }

      for (const supportedLang of ConsentLanguages.langSet) {

        if (supportedLang.indexOf(lang) !== -1 || supportedLang.indexOf(primaryLanguage) !== -1) {

          return supportedLang;

        }

      }

    }

    throw new Error(`unsupported language ${lang}`);

  }

  public forEach(callback: (key: string) => void): void {

    ConsentLanguages.langSet.forEach(callback);

  }

  public get size(): number {

    return ConsentLanguages.langSet.size;

  }

}
