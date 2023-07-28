export class ConsentLanguages {

  private static readonly langSet: Set<string> = new Set([
    'AR',
    'BG',
    'BS',
    'CA',
    'CS',
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
    'HR',
    'HU',
    'IT',
    'JA',
    'LT',
    'LV',
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
    'SR-CYRL',
    'SR-LATN',
    'SV',
    'TR',
    'ZH',
  ]);

  public has(key: string): boolean {

    return ConsentLanguages.langSet.has(key);

  }

  public parseLanguage(lang: string): string {

    lang = lang.toUpperCase();

    if (this.has(lang)) {

      return lang;

    }

    const primaryLanguage = lang.split('-')[0];

    if (this.has(primaryLanguage)) {

      return primaryLanguage;

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
