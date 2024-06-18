import { Container } from "@mantine/core";
import { FaGithub } from "react-icons/fa6";
import { tv } from "tailwind-variants";

import { REPO_URL } from "../../app/const";
import Link from "../element/Link";
const styles = tv({
  slots: {
    innerWrapper:
      "flex w-full flex-row flex-nowrap items-center justify-between",
    wrapper:
      "flex h-16 flex-row items-center border-t border-zinc-100 bg-white p-4",
  },
});

const css = styles();

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
          <FaGithub size={24} />
        </Link>
      </Container>
    </footer>
  );
};

export default Footer;
