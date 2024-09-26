import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export const Default: StoryObj<typeof Button> = {
  render: () => <Button onClick={() => alert("onClick")}>Default</Button>,
};

export const Transparent: StoryObj<typeof Button> = {
  render: () => (
    <Button variant="transparent" onClick={() => alert("onClick")}>
      Transparent
    </Button>
  ),
};

export default meta;
