"use client";

type CurrencyCode = "PLN" | "EUR" | "GBP" | "UAH";

const AVAILABLE_CURRENCY: { code: CurrencyCode; icon: string }[] = [
  { code: "PLN", icon: "🇵🇱" },
  { code: "EUR", icon: "🇪🇺" },
  { code: "GBP", icon: "🇬🇧" },
  { code: "UAH", icon: "🇺🇦" },
];

const ConversionWidget = () => {
  const handleOnClickSwitchCurrency = () => {
    alert("handleOnClickSwitchCurrency");
  };

  const handleOnClickConvert = () => {
    alert("handleOnClickConvert");
  };

  return (
    <div className="p-4 bg-gray-100">
      <div className="w-full flex mb-4">
        <select className="flex-1">
          {AVAILABLE_CURRENCY.map(({ code, icon }) => {
            return (
              <option key={code} value={code}>
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

        <select className="flex-1">
          {AVAILABLE_CURRENCY.map(({ code, icon }) => {
            return (
              <option key={code} value={code}>
                {icon}
                {code}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <div className="mb-4">
          <input type="number" min={0.01} step="0.01" />
        </div>

        <div className="mb-4">
          <input type="number" min={0.01} step="0.01" />
        </div>
      </div>

      <div className="mb-4">
        <div>Conversion rate</div>
      </div>

      <div>
        <button
          className="p-1 w-full bg-blue-500"
          onClick={handleOnClickConvert}
        >
          Convert
        </button>
      </div>
    </div>
  );
};

export default ConversionWidget;
