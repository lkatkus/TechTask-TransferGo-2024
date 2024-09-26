import { SelectInputOption } from "tg-ui";
import { ConversionFormValues } from "./ConversionWidget.types";

export const validateConversionForm = (values: ConversionFormValues) => {
  const { from, fromAmount, toAmount } = values;

  const errors: {
    [K in keyof ConversionFormValues]?: string;
  } = {};

  const fromAmountNumber = parseFloat(fromAmount);
  const toAmountNumber = parseFloat(toAmount);

  if (!fromAmount || isNaN(fromAmountNumber)) {
    errors.fromAmount = "Required";
  }

  if (!toAmount || isNaN(toAmountNumber)) {
    errors.toAmount = "Required";
  }

  if (!errors.fromAmount && from) {
    switch (from) {
      case "PLN":
        if (fromAmountNumber > 20000) {
          errors.fromAmount = "Max 20000 PLN";
        }
        break;
      case "EUR":
        if (fromAmountNumber > 5000) {
          errors.fromAmount = "Max 5000 EUR";
        }
        break;
      case "GBP":
        if (fromAmountNumber > 1000) {
          errors.fromAmount = "Max 1000 GBP";
        }
        break;
      case "UAH":
        if (fromAmountNumber > 50000) {
          errors.fromAmount = "Max 50000 UAH";
        }
        break;
      default:
        break;
    }
  }

  return errors;
};

export const getCurrencyOptions = (
  options: SelectInputOption[],
  disabledOptions: string[]
) => {
  return options.map((option) => ({
    ...option,
    disabled: disabledOptions.includes(option.value),
  }));
};
