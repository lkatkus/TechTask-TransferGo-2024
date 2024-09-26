import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "./NumberInput";

const meta: Meta<typeof NumberInput> = {
  component: NumberInput,
};

export const Default: StoryObj<typeof NumberInput> = {
  render: () => {
    return (
      <NumberInput
        label="Some number"
        value="9000"
        name="numberInput"
        onChange={() => alert("onChange")}
      />
    );
  },
};

export const WithError: StoryObj<typeof NumberInput> = {
  render: () => {
    return (
      <NumberInput
        label="Some number"
        value="9000"
        name="numberInput"
        error="Validation error"
        onChange={() => alert("onChange")}
      />
    );
  },
};

export const WithSuffix: StoryObj<typeof NumberInput> = {
  render: () => {
    return (
      <NumberInput
        label="Some number"
        value="9000"
        suffix="EUR"
        name="numberInput"
        onChange={() => alert("onChange")}
      />
    );
  },
};

export default meta;
