export type CurrencyCode = "PLN" | "EUR" | "GBP" | "UAH";

export interface ConversionFormValues {
  from: CurrencyCode;
  to: CurrencyCode;
  fromAmount: string;
  toAmount: string;
}
