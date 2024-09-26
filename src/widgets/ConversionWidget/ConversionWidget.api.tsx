import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CurrencyCode } from "./ConversionWidget.types";
import { API_FX_RATES_URL } from "./ConversionWidget.constants";

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

  return Promise.resolve({
    from: "EUR",
    to: "GBP",
    rate: 0.83579,
    fromAmount: 1,
    toAmount: 0.84,
  });

  const res = await fetch(url);
  const data = await res.json();

  // @TODO handle error
  return data;
};

export const useConversionQuery = ({
  enabled,
  from,
  to,
  amount,
}: {
  enabled: boolean;
  from: CurrencyCode;
  to: CurrencyCode;
  amount: string;
}) => {
  return useQuery({
    enabled,
    placeholderData: keepPreviousData,
    queryKey: ["conversionRate", from, to, amount],
    queryFn: () =>
      fetchConversionRate({
        from,
        to,
        amount,
      }),
  });
};
