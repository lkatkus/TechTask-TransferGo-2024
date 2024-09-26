import { PropsWithChildren } from "react";

const BUTTON_STYLES: { primary: string; transparent: string } = {
  primary:
    "tg-ui-p-2 tg-ui-w-full tg-ui-text-white tg-ui-bg-green-500 hover:tg-ui-bg-green-400 disabled:tg-ui-bg-gray-300",
  transparent:
    "tg-ui-p-2 tg-ui-w-full tg-ui-flex tg-ui-items-center tg-ui-justify-center hover:tg-ui-bg-gray-50",
};

interface ButtonProps extends PropsWithChildren {
  variant?: keyof typeof BUTTON_STYLES;
  disabled?: boolean;
  onClick: () => void;
}

export const Button = ({
  variant = "primary",
  disabled,
  onClick,
  children,
  ...rest
}: ButtonProps) => {
  const buttonClassName = BUTTON_STYLES[variant];

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={buttonClassName}
      {...rest}
    >
      {children}
    </button>
  );
};
