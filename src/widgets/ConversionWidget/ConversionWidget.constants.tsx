import { CurrencyCode } from "./ConversionWidget.types";

export const API_FX_RATES_URL = "https://my.transfergo.com/api/fx-rates";

export const INITIAL_AMOUNT = 1;
export const INITIAL_FROM_CURRENCY = "EUR";
export const INITIAL_TO_CURRENCY = "GBP";

export const AVAILABLE_CURRENCY: { value: CurrencyCode; label: string }[] = [
  { value: "PLN", label: "🇵🇱 PLN" },
  { value: "EUR", label: "🇪🇺 EUR" },
  { value: "GBP", label: "🇬🇧 GBP" },
  { value: "UAH", label: "🇺🇦 UAH" },
];
