"use client";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { CurrencyCode } from "./ConversionWidget.types";
import {
  API_FX_RATES_URL,
  AVAILABLE_CURRENCY,
  INITIAL_FROM_CURRENCY,
  INITIAL_TO_CURRENCY,
} from "./ConversionWidget.constants";

const queryClient = new QueryClient();

const fetchConversionRate = async ({
  from,
  to,
  amount,
}: {
  from: CurrencyCode;
  to: CurrencyCode;
  amount: string;
}) => {
  const params = new URLSearchParams({
    from,
    to,
    amount,
  });

  const url = new URL(API_FX_RATES_URL);
  url.search = params.toString();

  const res = await fetch(url);
  const data = await res.json();

  // @TODO handle error

  return data;
};

const ConversionWidget = () => {
  const [queryEnabled, setQueryEnabled] = useState(false);
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>(
    INITIAL_FROM_CURRENCY
  );
  const [toCurrency, setToCurrency] =
    useState<CurrencyCode>(INITIAL_TO_CURRENCY);

  const { isPending, isError, isLoading, data, error } = useQuery({
    enabled: queryEnabled,
    queryKey: ["conversionRate"],
    queryFn: () =>
      fetchConversionRate({
        from: fromCurrency,
        to: toCurrency,
        amount: String(fromAmount),
      }),
  });

  const handleOnClickSwitchCurrency: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();

    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleChangeFromCurrency: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const newValue = e.target.value as CurrencyCode;

    setFromCurrency(newValue);
  };

  const handleChangeToCurrency: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newValue = e.target.value as CurrencyCode;

    setToCurrency(newValue);
  };

  const handleSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setQueryEnabled(true);
  };

  const handleChangeFromAmount: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    const parsedNumber = Number(newValue);

    setFromAmount(parsedNumber);

    if (data) {
      console.log("SHOULD DEBOUNCE REFETCH");
    }
  };

  const handleChangeToAmount: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    const parsedNumber = Number(newValue);

    setToAmount(parsedNumber);

    if (data) {
      console.log("SHOULD DEBOUNCE REFETCH");
    }
  };

  useEffect(() => {
    if (data) {
      setFromAmount(data.fromAmount);
      setToAmount(data.toAmount);
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="p-4 bg-gray-100">
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
            onClick={handleOnClickSwitchCurrency}
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
                <option
                  key={code}
                  value={code}
                  disabled={code === fromCurrency}
                >
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

          {!isPending && (
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

        {isPending ? (
          <div>
            <button type="submit" className="p-1 w-full bg-blue-500">
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
    </form>
  );
};

const ConversionWidgetWithQueryClient = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConversionWidget />
    </QueryClientProvider>
  );
};

export default ConversionWidgetWithQueryClient;
