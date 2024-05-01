import Container from "@/components/Container"
import ButtonLink from "@/components/ui/ButtonLink"
import { Link } from "@remix-run/react"
import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    title: "text-2xl",
    wrapper: "bg-white",
  },
})

const css = styles()

const Header = () => {
  return (
    <header className={css.wrapper()}>
      <Container className="flex flex-row flex-nowrap justify-between">
        <p className={css.title()}>
          <Link to="/">A Todo App.</Link>
        </p>
        <ButtonLink to="/logout" variant={{ color: "red", size: "md" }}>
          Logout
        </ButtonLink>
      </Container>
    </header>
  )
}

export default Header
