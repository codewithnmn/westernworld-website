"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Mail } from "lucide-react";
import { FieldError, invalid, useFormChecks } from "@/components/FormChecks";
import { checkEmail } from "@/lib/validation";

/**
 * "Stay connected with us". A lead needs a mobile number, so subscribing opens the enquiry form with the email filled
 * in (owner decision, 26 Sep 2026).
 */
export default function NewsletterBox() {
  const router = useRouter();
  const checks = useFormChecks({ email: (v) => (v.trim() ? checkEmail(v, true) : "Pop in your email and the intake news will find its way to you.") });
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checks.validate(e.currentTarget)) return;
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim().toLowerCase();
    router.push(`/contact-us?${new URLSearchParams({ email, course: "Newsletter / stay connected" })}#enquiry`);
  };
  return (
    <div className="rounded-xl bg-brand-dark p-6 text-white">
      <Mail className="size-8 text-sky" />
      <h3 className="mt-3 text-2xl font-semibold text-white">Stay connected with us</h3>
      <p className="mt-1 text-sm text-white/70">Get updates on intakes, IELTS batches and visa news.</p>
      <form onSubmit={submit} noValidate className="mt-4">
        <div className="flex gap-2">
          <input {...checks.field("email")} type="email" required autoComplete="email" placeholder="Enter Your Email Address" aria-label="Your email address"
                 className={`min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-white/40 ${invalid(!!checks.errors.email, true)}`} />
          <button className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark">Subscribe</button>
        </div>
        <FieldError {...checks.error("email")} dark />
      </form>
    </div>
  );
}
