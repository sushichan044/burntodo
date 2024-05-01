import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare"

import { signInUpSchema } from "@/app/routes/_auth/form"
import { commitSession, getSession } from "@/app/sessions.server"
import { getApi } from "@/lib/api"
import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod"
import { Alert, Button, Container, TextInput } from "@mantine/core"
import { Form, json, redirect, useActionData } from "@remix-run/react"
import { LogIn } from "lucide-react"

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  if (session.has("userName")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/app")
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
  const [form, fields] = useForm({
    constraint: getZodConstraint(signInUpSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signInUpSchema })
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onBlur",
  })

  return (
    <Container className="flex-1 p-4" size="xs">
      <div className="flex flex-col gap-y-16">
        <h1 className="text-center text-4xl font-bold">
          Sign up to BurnTodo🔥
        </h1>
        <Form className="space-y-4" method="POST" {...getFormProps(form)}>
          {form.errors && form.errors.length > 0 && (
            <Alert
              classNames={{ message: "text-red-600 text-lg font-semibold" }}
              color="red"
              id={form.errorId}
              variant="light"
            >
              {form.errors}
            </Alert>
          )}
          <TextInput
            autoComplete="nickname"
            description="Enter your name"
            descriptionProps={{ id: fields.name.descriptionId }}
            size="lg"
            {...getInputProps(fields.name, {
              ariaDescribedBy: fields.name.descriptionId,
              type: "text",
            })}
            error={fields.name.errors}
            label="Name"
            name="name"
          />
          <Button
            className="w-full font-bold"
            color="cyan"
            disabled={!form.valid}
            leftSection={<LogIn />}
            size="lg"
            type="submit"
          >
            Sign up
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export async function action({ context, request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  const api = getApi({ context })
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema: signInUpSchema })
  if (submission.status !== "success") {
    return submission.reply()
  }
  const result = await api.user
    .$post({ json: submission.value })
    .then((res) => res.json())

  if (result.error) {
    return submission.reply({
      formErrors: [result.error],
    })
  }
  if (result.data == null) {
    return submission.reply({
      formErrors: ["Failed to sign up"],
    })
  }

  session.set("userName", result.data.name)
  return redirect("/app", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  })
}
