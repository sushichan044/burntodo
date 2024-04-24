import React from "react"
import { type VariantProps, tv } from "tailwind-variants"

type ButtonProps = {
  type: React.ComponentPropsWithoutRef<"button">["type"]
  variant?: ButtonVariant | undefined
} & Omit<React.ComponentPropsWithoutRef<"button">, "type">

type ButtonVariant = VariantProps<typeof buttonStyles>

const buttonStyles = tv({
  base: "transition duration-300 ease-in-out cursor-pointer disabled:cursor-not-allowed disabled:brightness-50",
  compoundVariants: [
    {
      className:
        "bg-green-600 text-zinc-100 hover:bg-green-700 focus:bg-green-700",
      color: "green",
      variant: "normal",
    },
    {
      className: "bg-sky-600 text-zinc-100 hover:bg-sky-700 focus:bg-sky-700",
      color: "sky",
      variant: "normal",
    },
    {
      className: "bg-red-600 text-zinc-100 hover:bg-red-700 focus:bg-red-700",
      color: "red",
      variant: "normal",
    },
    {
      className:
        "bg-green-200 text-green-700 hover:bg-green-300 focus:bg-green-300",
      color: "green",
      variant: "light",
    },
    {
      className: "bg-sky-200 text-sky-700 hover:bg-sky-300 focus:bg-sky-300",
      color: "sky",
      variant: "light",
    },
    {
      className: "bg-red-200 text-red-700 hover:bg-red-300 focus:bg-red-300",
      color: "red",
      variant: "light",
    },
  ],
  defaultVariants: {
    color: "green",
    size: "md",
    variant: "normal",
  },
  variants: {
    color: {
      green: undefined,
      red: undefined,
      sky: undefined,
    },
    size: {
      "2xl": "px-10 py-5 text-2xl rounded-lg",
      "lg": "px-6 py-3 text-lg rounded-md",
      "md": "px-4 py-2 text-base rounded-md",
      "sm": "px-2 py-1 text-sm rounded",
      "xl": "px-8 py-4 text-xl rounded-lg",
      "xs": "px-1 py-0.5 text-xs rounded",
    },
    variant: {
      light: undefined,
      normal: undefined,
    },
  },
})

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  variant,
  ...rest
}) => {
  return (
    <button
      className={buttonStyles({ className, ...variant })}
      type={type}
      {...rest}
    >
      {children}
    </button>
  )
}

export { type ButtonVariant, buttonStyles }
export default Button
