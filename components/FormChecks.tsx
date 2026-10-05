"use client";

import { useId, useState, type FocusEvent, type ChangeEvent } from "react";
import { CircleAlert } from "lucide-react";

type Check = (value: string) => string;
type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/**
 * Per-field validation for the site's forms (rules in lib/validation.ts). A field is checked when the visitor leaves
 * it, then live while they fix it; everything is checked on submit and focus jumps to the first problem.
 * Forms use `noValidate`, so these messages replace the browser's own bubbles.
 */
export function useFormChecks(checks: Record<string, Check>) {
  const id = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const run = (name: string, value: string) => {
    const message = checks[name]?.(value) ?? "";
    setErrors((e) => (e[name] === message ? e : { ...e, [name]: message }));
    return message;
  };

  /** Spread onto an input: wires blur/change checks and the accessible error description. */
  const field = (name: string) => ({
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}` : undefined,
    onBlur: (e: FocusEvent<Control>) => {
      setTouched((t) => ({ ...t, [name]: true }));
      run(name, e.currentTarget.value);
    },
    onChange: (e: ChangeEvent<Control>) => {
      if (touched[name] || errors[name]) run(name, e.currentTarget.value);
    },
  });

  /** Checks every field; returns true when the form can be sent. */
  const validate = (form: HTMLFormElement) => {
    let first: Control | null = null;
    for (const name of Object.keys(checks)) {
      const el = form.elements.namedItem(name) as Control | null;
      if (el && run(name, el.value) && !first) first = el;
    }
    setTouched(Object.fromEntries(Object.keys(checks).map((n) => [n, true])));
    first?.focus();
    return !first;
  };

  /** Shows a message from the CRM against a field (e.g. it rejected the phone number). */
  const setError = (name: string, message: string) => setErrors((e) => ({ ...e, [name]: message }));

  /** Props for <FieldError> under a field. */
  const error = (name: string) => ({ id: `${id}-${name}`, message: errors[name] ?? "" });

  return { field, validate, setError, errors, error };
}

/** The message under a field (announced to screen readers when it appears). */
export function FieldError({ id, message, dark = false }: { id: string; message: string; dark?: boolean }) {
  if (!message) return null;
  return (
    <span id={id} role="alert"
          className={`mt-1.5 flex items-start gap-1.5 text-xs font-medium tracking-normal normal-case ${dark ? "text-rose-200" : "text-red-600"}`}>
      <CircleAlert className="mt-px size-3.5 shrink-0" aria-hidden />{message}
    </span>
  );
}

/** Border colour for a field with an error. */
export const invalid = (on: boolean, dark = false) => (on ? (dark ? "border-rose-300!" : "border-red-500!") : "");
