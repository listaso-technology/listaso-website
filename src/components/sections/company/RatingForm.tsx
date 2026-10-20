"use client";

import { Fragment, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { reviewForm, submissionEndpoint } from "@/content/company/rating";
import styles from "./RatingForm.module.css";

type FormStatus = { tone: "error" | "success"; message: string } | null;

type SubmissionResponse = {
  message?: string;
  errors?: Array<{ message?: string }> | Record<string, string | string[]>;
};

function responseMessage(data: SubmissionResponse): string | undefined {
  if (data.message) return data.message;
  if (Array.isArray(data.errors)) return data.errors.find((error) => error.message)?.message;
  if (data.errors) {
    const value = Object.values(data.errors)[0];
    return Array.isArray(value) ? value[0] : value;
  }
  return undefined;
}

export function RatingForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);
    setStatus(null);

    try {
      const response = await fetch(submissionEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "site-reviews": {
            rating: Number(data.get("rating")),
            content: data.get("content"),
            name: data.get("name"),
          },
        }),
      });
      const payload = (await response.json()) as SubmissionResponse;
      const message = responseMessage(payload);

      if (!response.ok || !message) {
        setStatus({ tone: "error", message: message ?? reviewForm.errorMessage });
        return;
      }

      setStatus({ tone: "success", message });
      form.reset();
    } catch {
      setStatus({ tone: "error", message: reviewForm.errorMessage });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submitReview} className="flex flex-col gap-6" aria-describedby="rating-form-status">
      <fieldset disabled={pending} className="flex flex-col gap-6 disabled:opacity-70">
        <legend className="mb-3 text-small font-semibold text-fg-default">{reviewForm.ratingLabel}</legend>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <Fragment key={rating}>
              <input id={`rating-${rating}`} type="radio" name="rating" value={rating} required />
              <label htmlFor={`rating-${rating}`} aria-label={`${rating} ${rating === 1 ? "Star" : "Stars"}`}>
                ★
              </label>
            </Fragment>
          ))}
        </div>

        <label className="flex flex-col gap-2 text-small font-semibold text-fg-default" htmlFor="review-content">
          {reviewForm.reviewLabel} <span className="font-normal text-fg-muted">(required)</span>
          <textarea
            id="review-content"
            name="content"
            rows={6}
            required
            placeholder={reviewForm.reviewPlaceholder}
            className="w-full resize-y rounded-sm border border-line-control bg-surface-raised px-4 py-3 text-body text-fg-default placeholder:text-fg-muted hover:border-fg-default"
          />
        </label>

        <FormField
          id="review-name"
          name="name"
          label={reviewForm.nameLabel}
          placeholder={reviewForm.namePlaceholder}
          required
          autoComplete="name"
        />
      </fieldset>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending} aria-busy={pending}>
          {pending ? reviewForm.submittingLabel : reviewForm.submitLabel}
        </Button>
        <p
          id="rating-form-status"
          aria-live="polite"
          className={status?.tone === "error" ? "text-small text-status-error" : "text-small text-fg-accent"}
        >
          {status?.message}
        </p>
      </div>
    </form>
  );
}
