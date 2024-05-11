import type { VariantProps } from "tailwind-variants";

import Link from "@/components/element/Link";
import { Button, Container } from "@mantine/core";
import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    button: "text-base font-semibold",
    innerWrapper:
      "flex size-full flex-row flex-nowrap items-center justify-between",
    title:
      "inline-flex flex-row items-center justify-center gap-x-3 text-2xl font-bold",
    wrapper: "h-20 p-4",
  },
  variants: {
    theme: {
      app: {
        button: "bg-orange-400 hover:bg-orange-500 focus:bg-orange-500",
        innerWrapper: "text-white",
        wrapper: "bg-orange-400",
      },
      lp: {
        button: undefined,
        innerWrapper: "text-gray-800",
        wrapper: "border-b border-zinc-100 bg-white",
      },
    },
  },
});

const css = styles();

type HeaderProps = {
  hideUserMenu?: boolean | undefined;
  isLoggedIn?: boolean | undefined;
  variants?: VariantProps<typeof styles>;
};

const Header: React.FC<HeaderProps> = ({
  hideUserMenu,
  isLoggedIn,
  variants,
}) => {
  hideUserMenu ??= false;
  isLoggedIn ??= false;
  variants ??= { theme: "lp" };
  const buttonVariant = variants.theme === "app" ? "filled" : "default";

  return (
    <header className={css.wrapper(variants)}>
      <Container className={css.innerWrapper(variants)} size="md">
        <Link className={css.title()} to="/" variants={{ color: "current" }}>
          BurnTodo
        </Link>
        {!hideUserMenu &&
          (isLoggedIn ? (
            <Button
              className={css.button(variants)}
              component={Link}
              to="/logout"
              variant={buttonVariant}
              variants={{ color: "current" }}
            >
              Logout
            </Button>
          ) : (
            <Button
              className={css.button(variants)}
              component={Link}
              to="/login"
              variant={buttonVariant}
              variants={{ color: "current" }}
            >
              Login
            </Button>
          ))}
      </Container>
    </header>
  );
};

export default Header;
