import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ConversionWidget } from "./ConversionWidget";
import { useConversionQuery } from "./ConversionWidget.api";
import { act } from "@testing-library/react";

jest.mock("./ConversionWidget.api", () => ({
  useConversionQuery: jest.fn(),
}));

describe("ConversionWidget", () => {
  it("renders only fromAmount if data from query is missing", async () => {
    (useConversionQuery as jest.Mock).mockReturnValue({});

    await act(() => {
      render(<ConversionWidget />);
    });

    const fromAmountInput = screen.queryByTestId("NumberInput-fromAmount");
    const toAmountInput = screen.queryByTestId("NumberInput-toAmount");

    expect(fromAmountInput).toHaveValue(1);
    expect(toAmountInput).toBeNull();
  });

  it("changes fromAmount input value and calls query with that value", async () => {
    (useConversionQuery as jest.Mock).mockReturnValue({});

    await act(() => {
      render(<ConversionWidget />);
    });

    const fromAmountInput = screen.getByTestId("NumberInput-fromAmount");
    const convertButton = screen.getByTestId("convertButton");

    fireEvent.change(fromAmountInput, { target: { value: "123" } });
    fireEvent.click(convertButton);

    expect(fromAmountInput).toHaveValue(123);

    await waitFor(() => {
      expect(useConversionQuery).toHaveBeenLastCalledWith({
        amount: 123,
        enabled: true,
        from: "EUR",
        to: "GBP",
      });
    });
  });

  it("renders data from query", async () => {
    (useConversionQuery as jest.Mock).mockReturnValue({
      data: {
        from: "EUR",
        to: "GBP",
        rate: 0.85,
        fromAmount: 1,
        toAmount: 0.85,
      },
      isFetching: false,
    });

    await act(() => {
      render(<ConversionWidget />);
    });

    const fromAmountInput = screen.queryByTestId("NumberInput-fromAmount");
    const toAmountInput = screen.queryByTestId("NumberInput-toAmount");
    const rateDetails = screen.queryByTestId("rateDetails");

    expect(fromAmountInput).toHaveValue(1);
    expect(toAmountInput).toHaveValue(0.85);
    expect(rateDetails).toHaveTextContent("1 EUR = 0.85 GBP");
  });
});
