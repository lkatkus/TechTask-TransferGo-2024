"use client";

import {
  ChangeEventHandler,
  FocusEventHandler,
  useEffect,
  useState,
} from "react";
import { useFormik } from "formik";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SelectInput, NumberInput } from "@/components";
import { useConversionQuery } from "./ConversionWidget.api";
import {
  AVAILABLE_CURRENCY,
  INITIAL_CONVERSION_CONFIG,
  INITIAL_CONVERSION_FORM_STATE,
} from "./ConversionWidget.constants";
import {
  getCurrencyOptions,
  validateConversionForm,
} from "./ConversionWidget.utils";

const ConversionWidget = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [conversionConfig, setConversionConfig] = useState(
    INITIAL_CONVERSION_CONFIG
  );

  const { data, isFetching } = useConversionQuery({
    enabled: shouldFetch,
    from: conversionConfig.from,
    to: conversionConfig.to,
    amount: conversionConfig.amount,
  });

  const formik = useFormik({
    initialValues: INITIAL_CONVERSION_FORM_STATE,
    onSubmit: (values) => {
      setConversionConfig({
        from: values.from,
        to: values.to,
        amount: values.fromAmount,
      });

      if (!shouldFetch) {
        setShouldFetch(true);
      }
    },
    validate: validateConversionForm,
  });

  const handleSubmit = () => {
    formik.submitForm();
  };

  const handleClickSwitchCurrency = () => {
    const { values, isValid } = formik;

    if (isValid) {
      formik.setFieldValue("from", values.to);
      formik.setFieldValue("to", values.from);

      if (shouldFetch) {
        formik.submitForm();
      }
    }
  };

  const handleChangeWithSubmit: ChangeEventHandler<HTMLSelectElement> = (e) => {
    formik.handleChange(e);

    if (shouldFetch) {
      formik.submitForm();
    }
  };

  const handleBlurFromAmount: FocusEventHandler<HTMLInputElement> = (e) => {
    formik.handleBlur(e);

    if (shouldFetch) {
      const { values, errors } = formik;

      if (!errors.fromAmount) {
        setConversionConfig({
          from: values.from,
          to: values.to,
          amount: values.fromAmount,
        });
      }
    }
  };

  const handleBlurToAmount: FocusEventHandler<HTMLInputElement> = (e) => {
    formik.handleBlur(e);

    if (shouldFetch) {
      const { values, errors } = formik;

      if (!errors.toAmount) {
        setConversionConfig({
          from: values.to,
          to: values.from,
          amount: values.toAmount,
        });
      }
    }
  };

  useEffect(() => {
    if (data) {
      const isInverted =
        formik.values.to === data.from && formik.values.from === data.to;

      if (isInverted) {
        formik.setFieldValue("toAmount", data.fromAmount);
        formik.setFieldValue("fromAmount", data.toAmount);
      } else {
        formik.setFieldValue("toAmount", data.toAmount);
        formik.setFieldValue("fromAmount", data.fromAmount);
      }
    }
  }, [data]);

  return (
    <div className="w-full p-4 md:bg-gray-100 relative flex flex-col shadow-lg">
      <div className="mb-4 grid gap-1 grid-cols-[1fr_40px_1fr] items-center">
        <SelectInput
          label="FROM"
          name="from"
          value={formik.values.from}
          onChange={handleChangeWithSubmit}
          options={getCurrencyOptions(AVAILABLE_CURRENCY, formik.values.to)}
        />

        <button className="mx-2 px-2" onClick={handleClickSwitchCurrency}>
          {">"}
        </button>

        <SelectInput
          label="TO"
          name="to"
          value={formik.values.to}
          onChange={handleChangeWithSubmit}
          options={getCurrencyOptions(AVAILABLE_CURRENCY, formik.values.from)}
        />
      </div>

      <div
        className={
          data
            ? "mb-4 grid gap-1 grid-cols-[1fr_40px_1fr]"
            : "mb-4 grid gap-1 grid-cols-[1fr]"
        }
      >
        <div className="flex-1">
          <NumberInput
            name="fromAmount"
            label="AMOUNT"
            suffix={formik.values.from}
            value={formik.values.fromAmount}
            error={formik.errors.fromAmount}
            onChange={formik.handleChange}
            onBlur={handleBlurFromAmount}
          />
        </div>

        {data && (
          <>
            <div />
            <div className="flex-1">
              <NumberInput
                name="toAmount"
                label="CONVERTED TO"
                suffix={formik.values.to}
                value={formik.values.toAmount}
                error={formik.errors.toAmount}
                onChange={formik.handleChange}
                onBlur={handleBlurToAmount}
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-4">
        {!data ? (
          <button
            disabled={isFetching}
            onClick={handleSubmit}
            className="p-2 w-full bg-green-500 text-white"
          >
            Convert
          </button>
        ) : (
          <div>
            <div className="mb-2">
              <p className="text-s font-bold">
                1 {data.from} = {data.rate} {data.to}
              </p>
            </div>
            <div>
              <p className="text-xs">
                All figures are live mid-market rates, which are for
                informational purposes only. To see the rates for money
                transfer, please select sending money option.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const ConversionWidgetWithQueryClient = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConversionWidget />
    </QueryClientProvider>
  );
};

export default ConversionWidgetWithQueryClient;
