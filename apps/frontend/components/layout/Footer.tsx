import { REPO_URL } from "@/app/const"
import Link from "@/components/element/Link"
import { Container } from "@mantine/core"
import { GitHub } from "react-feather"
import { tv } from "tailwind-variants"
const styles = tv({
  slots: {
    innerWrapper:
      "flex w-full flex-row flex-nowrap items-center justify-between",
    wrapper:
      "flex h-20 flex-row items-center border-t border-zinc-100 bg-white p-4",
  },
})

const css = styles()

const Footer: React.FC = () => {
  return (
    <footer className={css.wrapper()}>
      <Container className={css.innerWrapper()} size="md">
        <p className="font-semibold text-zinc-600">
          © sushi-chaaaan {new Date().getFullYear()}
        </p>
        {
          // replace link later
        }
        <Link to={REPO_URL} variants={{ color: "current" }}>
          <GitHub />
        </Link>
      </Container>
    </footer>
  )
}

export default Footer
