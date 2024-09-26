export const validateConversionForm = (values: any) => {
  const { from, fromAmount, toAmount } = values;

  const errors: any = {};

  // @TODO add proper falsy validation

  if (!fromAmount && fromAmount !== 0) {
    errors.fromAmount = "Required";
  }

  if (!toAmount && toAmount !== 0) {
    errors.toAmount = "Required";
  }

  if (from === "PLN" && fromAmount > 20000) {
    errors.fromAmount = "Max 20000PLN";
  }

  if (from === "EUR" && fromAmount > 5000) {
    errors.fromAmount = "Max 5000EUR";
  }

  if (from === "GBP" && fromAmount > 1000) {
    errors.fromAmount = "Max 1000GBP";
  }

  if (from === "UAH" && fromAmount > 50000) {
    errors.fromAmount = "Max 50000UAH";
  }

  return errors;
};

export const getCurrencyOptions = (options, disabledOptions) => {
  return options.map((option) => ({
    ...option,
    disabled: disabledOptions.includes(option.value),
  }));
};
