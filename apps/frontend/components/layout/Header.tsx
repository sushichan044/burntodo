import ButtonLink from "@/components/ui/ButtonLink"
import { Container } from "@mantine/core"
import { Link } from "@remix-run/react"
import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    title:
      "inline-flex flex-row items-center justify-center gap-x-3 text-2xl font-bold text-gray-800",
    wrapper: "border-b border-zinc-100 bg-white p-4",
  },
})

const css = styles()

type HeaderProps = {
  showUserMenu?: boolean
}

const Header: React.FC<HeaderProps> = ({ showUserMenu }) => {
  showUserMenu ??= false

  return (
    <header className={css.wrapper()}>
      <Container
        className="flex flex-row flex-nowrap justify-between"
        size="md"
      >
        <p>
          <Link className={css.title()} to="/">
            Burn Todo🔥
          </Link>
        </p>
        {showUserMenu && (
          <ButtonLink to="/logout" variant={{ color: "red", size: "md" }}>
            Logout
          </ButtonLink>
        )}
      </Container>
    </header>
  )
}

export default Header
