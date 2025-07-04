import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Alert, Button, TextInput } from "@mantine/core";
import { FiLogIn } from "react-icons/fi";
import {
  data,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router";

import type { Route } from "./+types/route";

import { getApi } from "../../../lib/api";
import { getSessionCookieHelper } from "../../../lib/session";
import { signUpSchema } from "../_auth/form";

export const meta: Route.MetaFunction = ({ matches }) => {
  const parentMeta = matches
    .flatMap((match) => match?.meta ?? [])
    .filter((meta) => !("title" in meta));
  return [...parentMeta, { title: "Sign up | BurnTodo" }];
};

export async function loader({ context, request }: Route.LoaderArgs) {
  const helper = getSessionCookieHelper(context);

  const session = await helper.getSession(request.headers.get("Cookie"));
  if (session.has("userName")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/app");
  }

  return data(
    {},
    {
      headers: {
        "Set-Cookie": await helper.commitSession(session),
      },
    },
  );
}

export default function Route() {
  const lastResult = useActionData<typeof action>();
  const navigation = useNavigation();
  const [form, fields] = useForm({
    constraint: getZodConstraint(signUpSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signUpSchema });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onBlur",
  });
  const isSubmitting = navigation.formAction === "/signup";

  return (
    <>
      <h1 className="text-center text-4xl font-bold">Sign up to BurnTodo🔥</h1>
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
        <fieldset className="space-y-4" disabled={isSubmitting}>
          <TextInput
            autoComplete="username"
            description="Enter your name"
            descriptionProps={{ id: fields.name.descriptionId }}
            error={fields.name.errors}
            label="Name"
            size="lg"
            {...getInputProps(fields.name, {
              ariaDescribedBy: fields.name.descriptionId,
              type: "text",
            })}
          />
          <TextInput
            autoComplete="new-password"
            description="Enter your password"
            descriptionProps={{ id: fields.password.descriptionId }}
            error={fields.password.errors}
            label="Password"
            size="lg"
            {...getInputProps(fields.password, {
              ariaDescribedBy: fields.password.descriptionId,
              type: "password",
            })}
          />
          <Button
            className="w-full font-bold"
            color="cyan"
            disabled={!form.valid}
            leftSection={<FiLogIn />}
            loading={isSubmitting}
            size="lg"
            type="submit"
          >
            Sign up
          </Button>
        </fieldset>
      </Form>
    </>
  );
}

export async function action({ context, request }: Route.ActionArgs) {
  const helper = getSessionCookieHelper(context);
  const session = await helper.getSession(request.headers.get("Cookie"));
  const api = getApi({ context });
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: signUpSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }
  const result = await api.user
    .$post(
      { json: submission.value },
      {
        headers: {
          Origin: "https://burntodo.pages.dev",
        },
      },
    )
    .then(async (res) => await res.json())
    .catch((error) => {
      console.error(error);
      return { data: null, error: String(error) };
    });

  if (result.error != null) {
    return submission.reply({
      formErrors: [result.error],
    });
  }
  if (result.data == null) {
    return submission.reply({
      formErrors: ["Failed to sign up"],
    });
  }

  session.set("userName", result.data.name);
  return redirect("/app", {
    headers: {
      "Set-Cookie": await helper.commitSession(session),
    },
  });
}
