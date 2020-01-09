export class ConsentLanguages {

  private static readonly langSet: Set<string> = new Set([
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
