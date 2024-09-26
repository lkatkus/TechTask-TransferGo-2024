import { CurrencyCode } from "./ConversionWidget.types";

export const API_FX_RATES_URL = "https://my.transfergo.com/api/fx-rates";

export const INITIAL_AMOUNT = "1";
export const INITIAL_FROM_CURRENCY = "EUR";
export const INITIAL_TO_CURRENCY = "GBP";

export const INITIAL_CONVERSION_FORM_STATE: {
  from: CurrencyCode;
  to: CurrencyCode;
  fromAmount: string;
  toAmount: string;
} = {
  from: INITIAL_FROM_CURRENCY,
  to: INITIAL_TO_CURRENCY,
  fromAmount: INITIAL_AMOUNT,
  toAmount: INITIAL_AMOUNT,
};

export const INITIAL_CONVERSION_CONFIG: {
  from: CurrencyCode;
  to: CurrencyCode;
  amount: string;
} = {
  from: INITIAL_FROM_CURRENCY,
  to: INITIAL_TO_CURRENCY,
  amount: INITIAL_AMOUNT,
};

export const AVAILABLE_CURRENCY: { value: CurrencyCode; label: string }[] = [
  { value: "PLN", label: "🇵🇱 PLN" },
  { value: "EUR", label: "🇪🇺 EUR" },
  { value: "GBP", label: "🇬🇧 GBP" },
  { value: "UAH", label: "🇺🇦 UAH" },
];
