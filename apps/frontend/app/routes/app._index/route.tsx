import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";

import { parseWithZod } from "@conform-to/zod";
import { json, redirect } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

import { getApi } from "../../../lib/api";
import { getSessionCookieHelper } from "../../../lib/session";
import { DeleteTodoSchema, NewTodoSchema } from "../app/form";
import NewTodoModal from "./NewTodoModal";
import TodoWrapper from "./TodoWrapper";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const helper = getSessionCookieHelper(context);
  const session = await helper.getSession(request.headers.get("Cookie"));
  const name = session.get("userName");
  if (!(name ?? "")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/login");
  }

  const api = getApi({ context });
  const res = await api.user[":name"].todo
    .$get({ param: { name } })
    .then(async (res) => await res.json())
    .catch((error) => {
      console.error(error);
      return { data: null, error: String(error) };
    });

  return json(res, {
    headers: {
      "Set-Cookie": await helper.commitSession(session),
    },
  });
}

export default function Route() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="space-y-8 py-8 md:space-y-12">
      <section className="space-y-4">
        <div className="flex flex-row flex-nowrap items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-600">TASKS</h1>
          <aside className="max-md:fixed max-md:bottom-[88px] max-md:right-6">
            <NewTodoModal />
          </aside>
        </div>
        {(loaderData.error ?? "") && (
          <div className="grid grid-rows-[80px_1fr] gap-y-8 rounded-md bg-white p-8 text-rose-500 md:gap-y-12">
            <FiAlertCircle className="size-full" />
            <p className="text-center text-lg font-semibold md:text-xl">
              Error occurred while fetching data:
              <br />
              {loaderData.error}
            </p>
          </div>
        )}
        {loaderData.data == null || loaderData.data.todos.length < 1 ? (
          <div className="grid grid-rows-[80px_1fr] gap-y-8 rounded-md bg-white p-8 text-teal-500 md:gap-y-12">
            <FiCheckCircle className="size-full" />
            <p className="text-center text-lg font-semibold md:text-xl">
              All tasks are done! Nice job!
            </p>
          </div>
        ) : (
          <TodoWrapper todos={loaderData.data.todos} />
        )}
      </section>
    </div>
  );
}

export async function action({ context, request }: ActionFunctionArgs) {
  const helper = getSessionCookieHelper(context);

  const session = await helper.getSession(request.headers.get("Cookie"));
  const userName = session.get("userName");
  if (userName == null) {
    // Redirect to the home page if they are already signed in.
    return redirect("/login");
  }

  const api = getApi({ context });

  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const submission = parseWithZod(formData, { schema: NewTodoSchema });
      if (submission.status !== "success") {
        return submission.reply();
      }

      const result = await api.todo
        .$post({ json: { ...submission.value, userName } })
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
          formErrors: ["Failed to Create Todo"],
        });
      }
      break;
    }
    case "DELETE": {
      const formData = await request.formData();
      const submission = parseWithZod(formData, { schema: DeleteTodoSchema });
      if (submission.status !== "success") {
        return submission.reply();
      }

      const result = await api.todo[":id"]
        .$delete({
          param: { id: submission.value.id },
        })
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
          formErrors: ["Failed to Delete Todo"],
        });
      }

      return submission.reply({ formErrors: ["Success"] });
    }
  }

  return redirect("/app");
}
