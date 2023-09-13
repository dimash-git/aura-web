export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
}

export enum Locale {
  EN = 'en-US',
  FR = 'fr-FR',
}

class Price {
  private _value: number
  private _currency: Currency
  private _locale: Locale

  constructor(value: number, currency: Currency, locale: Locale = Locale.EN) {
      this._value = value
      this._currency = currency
      this._locale = locale
  }

  format(): string {
    const options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: this._currency,
    };
    return new Intl.NumberFormat(this._locale, options).format(this._value)
  }

  toSentence(): string {
    // TODO: implement
    // 1.36 => One dollar thirty six cents
    // 1.00 => One dollar
    // 1.01 => One dollar one cent
    // 2.00 => Two dollars
    // 2.01 => Two dollars one cent
    // 2.02 => Two dollars two cents
    // 2.10 => Two dollars ten cents
    // and so one...
    return ''
  }  
}

export default Price
