import NewTodoForm from "@/app/routes/app._index/NewTodoForm"
import { Button, Modal } from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { FaPlus } from "react-icons/fa6"

const NewTodoModal = () => {
  const [opened, { close, open }] = useDisclosure(false)
  const openModal = () => {
    open()
  }
  const closeModal = () => {
    close()
  }
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <>
      <Button
        className="bg-orange-400 transition hover:bg-orange-500 focus:bg-orange-500 max-md:aspect-square max-md:rounded-full max-md:p-2"
        onClick={openModal}
        size="lg"
      >
        <FaPlus size={24} />
        <p className="ms-2 max-md:hidden">Add New Todo</p>
      </Button>
      <Modal
        fullScreen={!isDesktop}
        onClose={closeModal}
        opened={opened}
        transitionProps={{ duration: 250, transition: "slide-up" }}
        withCloseButton={false}
      >
        <NewTodoForm onBackFn={closeModal} onSubmitFn={closeModal} />
      </Modal>
    </>
  )
}

export default NewTodoModal
