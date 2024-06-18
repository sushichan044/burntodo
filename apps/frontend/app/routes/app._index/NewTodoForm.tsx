import type { VariantProps } from "tailwind-variants";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Button, Container, Divider, TextInput, Textarea } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useRef } from "react";
import { FaList } from "react-icons/fa6";
import { tv } from "tailwind-variants";

import type { action as AppIndexAction } from "./route";

import { NewTodoSchema } from "../app/form";

type OnSubmit = ReturnType<typeof useForm>[0]["onSubmit"];

type NewTodoFormProps = {
  onBackFn?: () => void;
  onSubmitFn?: OnSubmit;
  variants?: VariantProps<typeof style>;
};

const style = tv({
  defaultVariants: {
    layout: "mobile",
  },
  slots: {
    button: "transition disabled:cursor-not-allowed disabled:opacity-50",
    formWrapper: "caret-orange-500 [&_input]:placeholder:text-lg",
    header:
      "flex flex-row flex-nowrap justify-between text-lg font-semibold text-orange-500",
    wrapper: "size-full",
  },
  variants: {
    layout: {
      mobile: {
        wrapper: "space-y-12 py-8",
      },
      pc: {
        wrapper: "space-y-6 py-8",
      },
    },
  },
});

const NewTodoForm: React.FC<NewTodoFormProps> = ({
  onBackFn,
  onSubmitFn: onSubmitProp,
  variants,
}) => {
  const lastResult = useActionData<typeof AppIndexAction>();
  const navigation = useNavigation();
  const [form, fields] = useForm({
    constraint: getZodConstraint(NewTodoSchema),
    lastResult,
    onSubmit(event) {
      if (onSubmitProp) {
        onSubmitProp(event);
      }
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: NewTodoSchema });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onBlur",
  });
  const ref = useRef<HTMLFormElement | null>(null);
  const css = style(variants);
  const isSubmitting = navigation.formAction === "/app?index";

  return (
    <div className={css.wrapper()}>
      <Container className={css.header()} size="md">
        <Button
          className={css.button()}
          color="orange"
          onClick={onBackFn}
          radius="xl"
          size="md"
          type="button"
          variant="subtle"
        >
          Back
        </Button>
        <Button
          className={css.button()}
          color="orange"
          disabled={!form.valid}
          form={form.id}
          loading={isSubmitting}
          radius="xl"
          size="md"
          type="submit"
        >
          Create
        </Button>
      </Container>
      <Container size="md">
        <Form
          action="/app?index"
          className={css.formWrapper()}
          method="POST"
          onKeyDown={getHotkeyHandler([
            [
              "ctrl+enter",
              () => {
                ref.current?.submit();
              },
            ],
          ])}
          ref={ref}
          {...getFormProps(form)}
        >
          <fieldset disabled={isSubmitting}>
            <TextInput
              classNames={{ input: "text-base" }}
              data-autofocus
              error={fields.title.errors}
              errorProps={{ className: "ps-[60px] font-semibold text-sm" }}
              label="title"
              labelProps={{ className: "sr-only " }}
              leftSection={<></>}
              leftSectionWidth={60}
              placeholder="Enter title"
              size="xl"
              variant="unstyled"
              {...getInputProps(fields.title, {
                ariaDescribedBy: fields.title.descriptionId,
                type: "text",
              })}
            />
            <Divider my="sm" />
            <Textarea
              autosize
              classNames={{ input: "text-base" }}
              error={fields.description.errors}
              errorProps={{ className: "ps-[60px] font-semibold text-sm" }}
              label="description"
              labelProps={{ className: "sr-only" }}
              leftSection={<FaList />}
              leftSectionWidth={60}
              maxRows={5}
              placeholder="Enter description"
              size="xl"
              variant="unstyled"
              {...getInputProps(fields.description, {
                ariaDescribedBy: fields.description.descriptionId,
                type: "text",
              })}
            />
          </fieldset>
        </Form>
      </Container>
    </div>
  );
};

export default NewTodoForm;
