import type { LinkProps as ReactRouterLinkProps } from "react-router";
import type { VariantProps } from "tailwind-variants";

import { Link as ReactRouterLink } from "react-router";
import { tv } from "tailwind-variants";

import { cn } from "../../../lib/cn";
import { isInternalLink } from "./util";
type LinkProps = ReactRouterLinkProps & {
  variants?: VariantProps<typeof linkStyles> | undefined;
};

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
      rel: "noopener noreferrer" + (relProp ?? "" ? ` ${relProp}` : ""),
      target: "_blank",
    };
  })();

  return (
    <ReactRouterLink
      className={cn(linkStyles(variants), className)}
      rel={rel}
      target={target}
      to={to}
      {...rest}
    >
      {children}
    </ReactRouterLink>
  );
};

export default Link;
