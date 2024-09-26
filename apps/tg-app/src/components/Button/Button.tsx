import { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  variant?: keyof typeof BUTTON_STYLES;
  disabled?: boolean;
  onClick: () => void;
}

const BUTTON_STYLES: { primary: string; transparent: string } = {
  primary:
    "p-2 w-full text-white bg-green-500 hover:bg-green-400 disabled:bg-gray-300",
  transparent: "px-2 flex items-center justify-center",
};

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
