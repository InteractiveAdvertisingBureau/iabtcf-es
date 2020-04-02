export class ConsentLanguages {

  private static readonly langSet: Set<string> = new Set([
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
  ]);

  public has(key: string): boolean {

    return ConsentLanguages.langSet.has(key);

  }

  public forEach(callback: (key: string) => void): void {

    ConsentLanguages.langSet.forEach(callback);

  }

  public get size(): number {

    return ConsentLanguages.langSet.size;

  }

}
