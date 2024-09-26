import type { Meta, StoryObj } from "@storybook/react";
import { SelectInput, SelectInputOption } from "./SelectInput";

const meta: Meta<typeof SelectInput> = {
  component: SelectInput,
};

const MOCK_OPTIONS: SelectInputOption[] = [
  { value: "1", label: "label-1" },
  { value: "2", label: "label-2" },
  { value: "3", label: "label-3" },
  { value: "4", label: "label-4" },
  { value: "5", label: "label-4", disabled: true },
];

export const Default: StoryObj<typeof SelectInput> = {
  render: () => {
    return (
      <SelectInput
        label="Some number"
        name="selectInput"
        value="1"
        options={MOCK_OPTIONS}
        onChange={() => alert("onChange")}
      />
    );
  },
};

export default meta;
