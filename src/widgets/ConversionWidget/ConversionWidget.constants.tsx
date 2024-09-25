import { CurrencyCode } from "./ConversionWidget.types";

export const API_FX_RATES_URL = "https://my.transfergo.com/api/fx-rates";

export const INITIAL_AMOUNT = 1;
export const INITIAL_FROM_CURRENCY = "EUR";
export const INITIAL_TO_CURRENCY = "GBP";

export const AVAILABLE_CURRENCY: { code: CurrencyCode; icon: string }[] = [
  { code: "PLN", icon: "🇵🇱" },
  { code: "EUR", icon: "🇪🇺" },
  { code: "GBP", icon: "🇬🇧" },
  { code: "UAH", icon: "🇺🇦" },
];
