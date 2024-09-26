import type { Meta, StoryObj } from "@storybook/react";
import { TestComponent } from "./index";

const meta: Meta<typeof TestComponent> = {
  component: TestComponent,
};

export const Default: StoryObj<typeof TestComponent> = {
  render: () => <TestComponent />,
};

export default meta;
