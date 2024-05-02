import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare"

import { commitSession, getSession } from "@/app/sessions.server"
import { getApi } from "@/lib/api"
import { useForm } from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod"
import { Modal } from "@mantine/core"
import { json, redirect } from "@remix-run/cloudflare"
import { useActionData, useNavigate } from "@remix-run/react"

import { NewTodoSchema } from "../app/form"

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  if (!session.has("userName")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/login")
  }

  return json(
    {},
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  )
}

export default function Route() {
  const lastResult = useActionData<typeof action>()
  const navigate = useNavigate()

  const [form, fields] = useForm({
    constraint: getZodConstraint(NewTodoSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: NewTodoSchema })
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onBlur",
  })

  return (
    <Modal
      fullScreen
      onClose={() => navigate(-1)}
      opened
      transitionProps={{ transition: "fade-up" }}
    >
      <div>Hello!</div>
    </Modal>
  )
}

export async function action({ context, request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  const userName = session.get("userName")
  if (!userName) {
    // Redirect to the home page if they are already signed in.
    return redirect("/login")
  }

  const api = getApi({ context })
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema: NewTodoSchema })
  if (submission.status !== "success") {
    return submission.reply()
  }

  const result = await api.todo
    .$post({ json: { ...submission.value, userName } })
    .then((res) => res.json())

  if (result.error) {
    return submission.reply({
      formErrors: [result.error],
    })
  }
  if (result.data == null) {
    return submission.reply({
      formErrors: ["Failed to Create Todo"],
    })
  }

  return redirect("/app")
}
