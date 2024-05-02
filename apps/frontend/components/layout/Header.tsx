import { Button, Container } from "@mantine/core"
import { Link } from "@remix-run/react"
import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    innerWrapper:
      "flex size-full flex-row flex-nowrap items-center justify-between",
    title:
      "inline-flex flex-row items-center justify-center gap-x-3 text-2xl font-bold text-gray-800",
    wrapper: "h-20 border-b border-zinc-100 bg-white p-4",
  },
})

const css = styles()

type HeaderProps = {
  hideUserMenu?: boolean | undefined
  isLoggedIn?: boolean | undefined
}

const Header: React.FC<HeaderProps> = ({ hideUserMenu, isLoggedIn }) => {
  isLoggedIn ??= false
  hideUserMenu ??= false

  return (
    <header className={css.wrapper()}>
      <Container className={css.innerWrapper()} size="md">
        <Link className={css.title()} to="/">
          BurnTodo🔥
        </Link>
        {!hideUserMenu &&
          (isLoggedIn ? (
            <Button component={Link} to="/logout" variant="default">
              Logout
            </Button>
          ) : (
            <Button component={Link} to="/login" variant="default">
              Login
            </Button>
          ))}
      </Container>
    </header>
  )
}

export default Header
