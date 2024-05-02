import { useWindow } from "@/hooks/useWindow"
import { ActionIcon, Affix, Button, Container, Modal } from "@mantine/core"
import { ActionIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useNavigate } from "@remix-run/react"
import { Plus } from "react-feather"

const NewTodoModal = () => {
  const [opened, { close, open }] = useDisclosure(false)
  const navigate = useNavigate()
  const window = useWindow()

  return (
    <>
      <Affix position={{ bottom: 100, right: 20 }}>
        <ActionIcon
          onClick={() => {
            window?.history.pushState(null, "", "/app/new")
            open()
          }}
          radius="xl"
          size={40}
        >
          <Plus />
        </ActionIcon>
      </Affix>
      <Modal
        classNames={{
          header: "max-w-[500px] mx-auto",
        }}
        fullScreen
        onClose={() => {
          navigate(-1)
          close()
        }}
        opened={opened}
        title={<h1 className="text-2xl font-bold">New Todo</h1>}
        transitionProps={{ duration: 250, transition: "slide-up" }}
      >
        <Container size={500}>Hello!</Container>
      </Modal>
    </>
  )
}

export default NewTodoModal
