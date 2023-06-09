import React, { ReactNode } from "react";

export const ButtonKind = {
  Primary: "primary",
  Secondary: "secondary",
  Tertiary: "tertiary",
  Ghost: "ghost",
};

export const ButtonType: {
  Button: "button";
  Reset: "reset";
  Submit: "submit";
} = {
  Button: "button",
  Reset: "reset",
  Submit: "submit",
};

export const ButtonSize = {
  Large: "large",
  Medium: "medium",
  Small: "small",
};

const BUTTON_CLASSES =
  "transition-all font-primary select-none rounded-[0.25rem] px-[1.5rem] py-[0.8438rem] cursor-pointer hover:opacity-90 active:opacity-80 flex justify-center items-center gap-1";

const PRIMARY_CLASSES = "border-none text-white bg-primary";
const SECONDARY_CLASSES =
  "border border-grey-300 py-[0.7813rem] text-grey-900 bg-white";
const TERTIARY_CLASSES =
  "border-none text-white bg-grey-800 w-[3.4375rem] h-[1.5rem] pl-2 pr-2 py-1";
const GHOST_CLASSES =
  "border-none w-fit h-fit pt-0 pb-0 pl-0 pr-0 hover:opacity-75";

const LARGE_CLASSES = "text-sm px-6 py-3";
const MEDIUM_CLASSES = "text-base";
const SMALL_CLASSES = "text-sm";

const DISABLED_CLASSES = "bg-grey-200 hover:cursor-default";

const KIND_CLASS = {
  [ButtonKind.Primary]: PRIMARY_CLASSES,
  [ButtonKind.Secondary]: SECONDARY_CLASSES,
  [ButtonKind.Tertiary]: TERTIARY_CLASSES,
  [ButtonKind.Ghost]: GHOST_CLASSES,
};

const SIZE_CLASS = {
  [ButtonSize.Large]: LARGE_CLASSES,
  [ButtonSize.Medium]: MEDIUM_CLASSES,
  [ButtonSize.Small]: SMALL_CLASSES,
};

type ButtonTypes = {
  kind?: string;
  type?: "button" | "reset" | "submit" | undefined;
  disabled?: boolean;
  className?: string;
  size?: string;
  icon?: ReactNode;
  children?: ReactNode | string;
  [key: string]: unknown;
};

const Button = ({
  kind = ButtonKind.Primary,
  type = ButtonType.Button,
  disabled = false,
  className = "",
  size = ButtonSize.Medium,
  icon = undefined,
  children = undefined,
  ...otherProps
}: ButtonTypes) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={`${BUTTON_CLASSES} ${KIND_CLASS[kind]} ${SIZE_CLASS[size]} ${
      disabled && DISABLED_CLASSES
    } ${
      icon && !children && "h-[1.5rem] w-[1.5rem]" // The icon does not show otherwise. It needs w and h defined
    } ${className}`}
    disabled={disabled}
    {...otherProps}
  >
    {icon}
    {children}
  </button>
);

export default Button;
