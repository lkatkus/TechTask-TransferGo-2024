"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CurrencyCode } from "./ConversionWidget.types";
import {
  AVAILABLE_CURRENCY,
  INITIAL_FROM_CURRENCY,
  INITIAL_TO_CURRENCY,
} from "./ConversionWidget.constants";
import { useConversionQuery } from "./ConversionWidget.api";
import { useFormik } from "formik";
import { SelectInput } from "@/components/SelectInput";
import { NumberInput } from "@/components/NumberInput";
import {
  getCurrencyOptions,
  validateConversionForm,
} from "./ConversionWidget.utils";
import { Spinner } from "@/components/Spinner";

const ConversionWidget = () => {
  const [queryEnabled, setQueryEnabled] = useState(false);
  const [updatingToAmount, setUpdatingToAmount] = useState(false);

  const [conversionConfig, setConversionConfig] = useState<{
    from: CurrencyCode;
    to: CurrencyCode;
    amount: number;
  }>({
    from: INITIAL_FROM_CURRENCY,
    to: INITIAL_TO_CURRENCY,
    amount: 1,
  });

  const { data, isFetching } = useConversionQuery({
    enabled: queryEnabled,
    from: conversionConfig.from,
    to: conversionConfig.to,
    amount: String(conversionConfig.amount),
  });

  const formik = useFormik({
    initialValues: {
      from: INITIAL_FROM_CURRENCY,
      to: INITIAL_TO_CURRENCY,
      fromAmount: 1,
      toAmount: 1,
    },
    onSubmit: (values) => {
      const payload: any = updatingToAmount
        ? {
            from: values.to,
            to: values.from,
            amount: values.toAmount,
          }
        : {
            from: values.from,
            to: values.to,
            amount: values.fromAmount,
          };

      setConversionConfig(payload);

      if (!queryEnabled) {
        setQueryEnabled(true);
      }
    },
    validate: validateConversionForm,
  });

  const handleSubmit = () => {
    formik.submitForm();
  };

  const handleClickSwitchCurrency = (e) => {
    e.preventDefault();

    const { values } = formik;

    formik.setFieldValue("from", values.to);
    formik.setFieldValue("to", values.from);

    // @TODO check issue when switching currencies over the limit

    if (queryEnabled) {
      formik.submitForm();
    }
  };

  const handleChangeWithSubmit = (e) => {
    formik.handleChange(e);

    if (queryEnabled) {
      formik.submitForm();
    }
  };

  const handleBlurWithSubmit = (e) => {
    formik.handleBlur(e);

    if (queryEnabled) {
      formik.submitForm();
    }
  };

  const handleBlurToAmount = (e) => {
    formik.handleBlur(e);
    setUpdatingToAmount(true);

    if (queryEnabled) {
      formik.submitForm();
    }
  };

  useEffect(() => {
    if (data) {
      if (updatingToAmount) {
        setUpdatingToAmount(false);

        formik.setFieldValue("fromAmount", data.toAmount);
        formik.setFieldValue("toAmount", data.fromAmount);
      } else {
        formik.setFieldValue("toAmount", data.toAmount);
      }
    }
  }, [data]);

  return (
    <div className=" w-full p-4 bg-gray-100 relative">
      {isFetching && <Spinner />}
      <div className="w-full flex mb-4 items-center">
        <div className="flex-1">
          <SelectInput
            label="FROM:"
            name="from"
            value={formik.values.from}
            onChange={handleChangeWithSubmit}
            options={getCurrencyOptions(AVAILABLE_CURRENCY, formik.values.to)}
          />
        </div>

        <button
          className="bg-blue-500 mx-2 px-2"
          onClick={handleClickSwitchCurrency}
        >
          {">"}
        </button>

        <div className="flex-1">
          <SelectInput
            label="TO:"
            name="to"
            value={formik.values.to}
            onChange={handleChangeWithSubmit}
            options={getCurrencyOptions(AVAILABLE_CURRENCY, formik.values.from)}
          />
        </div>
      </div>

      <div className="mb-4 flex">
        <div className="flex-1 flex flex-col">
          <NumberInput
            label="AMOUNT:"
            suffix={formik.values.from}
            name="fromAmount"
            value={formik.values.fromAmount}
            error={formik.errors.fromAmount}
            onBlur={handleBlurWithSubmit}
            onChange={formik.handleChange}
          />
        </div>

        {data && (
          <div className="flex-1 flex flex-col">
            <NumberInput
              label="CONVERTED TO:"
              suffix={formik.values.to}
              name="toAmount"
              value={formik.values.toAmount}
              onBlur={handleBlurToAmount}
              onChange={formik.handleChange}
              error={formik.errors.toAmount}
            />
          </div>
        )}
      </div>

      {!data ? (
        <div>
          <button onClick={handleSubmit} className="p-1 w-full bg-blue-500">
            Convert
          </button>
        </div>
      ) : (
        <div>
          <div>
            1 {data.from} = {data.rate} {data.to}
          </div>
          <div>
            All figures are live mid-market rates, which are for informational
            purposes only. To see the rates for money transfer, please select
            sending money option.
          </div>
        </div>
      )}
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
