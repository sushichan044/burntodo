import type { RemixLinkProps } from "@remix-run/react/dist/components";
import type { VariantProps } from "tailwind-variants";

import { cn } from "@/lib/cn";
import { Link as RemixLink } from "@remix-run/react";
import { tv } from "tailwind-variants";

import { isInternalLink } from "./util";
type LinkProps = {
  variants?: VariantProps<typeof linkStyles> | undefined;
} & RemixLinkProps;

const linkStyles = tv({
  base: "transition duration-200 ease-in-out",
  compoundVariants: [
    {
      className: "hover:text-blue-700 focus:text-blue-700",
      color: "blue",
      hocus: "color",
    },
    {
      className: "hover:brightness-95 focus:brightness-95",
      color: "current",
      hocus: "color",
    },
  ],
  defaultVariants: {
    color: "blue",
    hocus: "color",
  },
  variants: {
    color: {
      blue: "text-blue-500",
      current: "text-current",
      none: undefined,
    },
    hocus: {
      color: undefined,
      underline: "hover:underline focus:underline",
    },
  },
});

const Link: React.FC<LinkProps> = ({
  children,
  className,
  rel: relProp,
  target: targetProp,
  to,
  variants,
  ...rest
}) => {
  const { rel, target } = (() => {
    if (typeof to !== "string" || isInternalLink(to))
      return { rel: relProp, target: targetProp };
    return {
      rel: "noopener noreferrer" + (relProp ? ` ${relProp}` : ""),
      target: "_blank",
    };
  })();

  return (
    <RemixLink
      className={cn(linkStyles(variants), className)}
      rel={rel}
      target={target}
      to={to}
      {...rest}
    >
      {children}
    </RemixLink>
  );
};

export default Link;
