"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChangeEventHandler, useEffect, useState } from "react";
import { CurrencyCode } from "./ConversionWidget.types";
import {
  AVAILABLE_CURRENCY,
  INITIAL_FROM_CURRENCY,
  INITIAL_TO_CURRENCY,
} from "./ConversionWidget.constants";
import { useConversionQuery } from "./ConversionWidget.api";

const ConversionWidget = () => {
  const [queryEnabled, setQueryEnabled] = useState(false);
  const [updatingToAmount, setUpdatingToAmount] = useState(false);

  const [fromAmount, setFromAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>(
    INITIAL_FROM_CURRENCY
  );

  const [toAmount, setToAmount] = useState(1);
  const [toCurrency, setToCurrency] =
    useState<CurrencyCode>(INITIAL_TO_CURRENCY);

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

  const handleClickSwitchCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

    setConversionConfig({
      from: toCurrency,
      to: fromCurrency,
      amount: fromAmount,
    });
  };

  const handleClickConvert = () => {
    setQueryEnabled(true);
  };

  const handleChangeFromCurrency: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const newValue = e.target.value as CurrencyCode;

    setFromCurrency(newValue);
    setConversionConfig((v) => ({ ...v, from: newValue }));
  };

  const handleChangeToCurrency: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newValue = e.target.value as CurrencyCode;

    setToCurrency(newValue);
    setConversionConfig((v) => ({ ...v, to: newValue }));
  };

  const handleChangeFromAmount: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    const parsedNumber = Number(newValue);

    setFromAmount(parsedNumber);
    setConversionConfig({
      from: fromCurrency,
      to: toCurrency,
      amount: parsedNumber,
    });
  };

  const handleChangeToAmount: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    const parsedNumber = Number(newValue);

    setUpdatingToAmount(true);
    setToAmount(parsedNumber);
    setConversionConfig({
      from: toCurrency,
      to: fromCurrency,
      amount: parsedNumber,
    });
  };

  useEffect(() => {
    if (data) {
      if (updatingToAmount) {
        setUpdatingToAmount(false);
        setFromAmount(data.toAmount);
        setToAmount(data.fromAmount);
      } else {
        setFromAmount(data.fromAmount);
        setToAmount(data.toAmount);
      }
    }
  }, [data]);

  return (
    <div className="relative w-full p-4 bg-gray-100">
      {isFetching && (
        <div className="absolute bg-gray-100 bg-opacity-50 top-0 left-0 w-full h-full flex justify-center items-center">
          LOADING...
        </div>
      )}
      <div className="w-full flex mb-4">
        <select
          className="flex-1"
          value={fromCurrency}
          onChange={handleChangeFromCurrency}
        >
          {AVAILABLE_CURRENCY.map(({ code, icon }) => {
            return (
              <option key={code} value={code} disabled={code === toCurrency}>
                {icon}
                {code}
              </option>
            );
          })}
        </select>

        <button
          className="bg-blue-500 mx-2 px-2"
          onClick={handleClickSwitchCurrency}
        >
          {">"}
        </button>

        <select
          className="flex-1"
          value={toCurrency}
          onChange={handleChangeToCurrency}
        >
          {AVAILABLE_CURRENCY.map(({ code, icon }) => {
            return (
              <option key={code} value={code} disabled={code === fromCurrency}>
                {icon}
                {code}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mb-4 flex">
        <div className="flex-1 flex">
          <input
            className="flex-1"
            type="number"
            min={0.01}
            step="0.01"
            value={fromAmount}
            onChange={handleChangeFromAmount}
          />
          <div>{fromCurrency}</div>
        </div>

        {data && (
          <div className="flex-1 flex">
            <input
              className="flex-1"
              type="number"
              min={0.01}
              step="0.01"
              value={toAmount}
              onChange={handleChangeToAmount}
            />
            <div>{toCurrency}</div>
          </div>
        )}
      </div>

      {!data ? (
        <div>
          <button
            className="p-1 w-full bg-blue-500"
            onClick={handleClickConvert}
          >
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

const queryClient = new QueryClient();

const ConversionWidgetWithQueryClient = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConversionWidget />
    </QueryClientProvider>
  );
};

export default ConversionWidgetWithQueryClient;
