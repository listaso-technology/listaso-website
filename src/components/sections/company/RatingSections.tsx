import { Container } from "@/components/layout/Container";
import { ratingSummary, reviews, introduction } from "@/content/company/rating";
import { cx } from "@/lib/utils/cx";
import { Stars } from "../home/Stars";
import { ProductSection } from "../product/ProductSection";
import { DossierHeader } from "../variants/DossierHeader";
import dossier from "../variants/dossier.module.css";
import { RatingForm } from "./RatingForm";

export function RatingSnapshot() {
  return (
    <div data-reveal="fade" className="border-t-2 border-fg-heading pt-6">
      <div className="flex items-end justify-between gap-4 border-b border-line-subtle pb-6">
        <div className="flex flex-col gap-2">
          <span className="text-display leading-none font-bold text-fg-heading">{ratingSummary.score}</span>
          <Stars label={ratingSummary.accessibleLabel} />
        </div>
        <p className="max-w-48 text-right text-small font-semibold text-fg-muted">
          {ratingSummary.accessibleLabel}
        </p>
      </div>
      <dl className="flex flex-col gap-3 pt-6">
        {ratingSummary.distribution.map((item) => (
          <div key={item.label} className="grid grid-cols-[5rem_1fr_2.5rem] items-center gap-3 text-small">
            <dt className="text-fg-muted">{item.label}</dt>
            <dd
              className="h-2 overflow-hidden rounded-full bg-surface-soft"
              role="progressbar"
              aria-label={`${item.label}: ${item.percentage}%`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={item.percentage}
            >
              <span
                className="block h-full rounded-full bg-status-warning"
                style={{ width: `${item.percentage}%` }}
              />
            </dd>
            <dd className="text-right font-semibold text-fg-heading">{item.percentage}%</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function RatingReviewForm() {
  return (
    <ProductSection labelledBy="review-form-title" tone="alt">
      <Container width="wide" className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <DossierHeader
          id="review-form-title"
          eyebrow="Rate Listaso"
          title={introduction.title}
          lead={introduction.text}
          className="lg:col-span-5"
        />
        <div data-reveal="fade" className="border-t-2 border-fg-heading pt-8 lg:col-span-7">
          <RatingForm />
        </div>
      </Container>
    </ProductSection>
  );
}

export function RatingPublishedReviews() {
  return (
    <ProductSection labelledBy="published-reviews-title">
      <Container width="wide" className="flex flex-col gap-12">
        <div className="flex flex-col justify-between gap-6 border-b-2 border-fg-heading pb-6 lg:flex-row lg:items-end">
          <div>
            <p className={cx(dossier.bracket, "text-eyebrow font-bold text-fg-accent uppercase")}>Rate Listaso</p>
            <h2 id="published-reviews-title" className="mt-4 text-h2 font-bold text-balance text-fg-heading">
              {ratingSummary.accessibleLabel}
            </h2>
          </div>
          <span className="text-display leading-none font-bold text-fg-heading" aria-hidden="true">
            {ratingSummary.score}
          </span>
        </div>

        <ul data-reveal="group" className="grid gap-8 lg:grid-cols-2">
          {reviews.map((review, index) => (
            <li
              data-reveal-item
              key={`${review.name}-${review.date}`}
              className="flex min-h-80 flex-col justify-between gap-10 border-t border-line-subtle pt-8"
            >
              <figure className="flex h-full flex-col justify-between gap-10">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <Stars label={`${review.rating} out of 5 stars`} />
                    <time className="text-small font-semibold tracking-wide text-fg-muted uppercase">
                      {review.date}
                    </time>
                  </div>
                  <blockquote className="text-body-lg text-fg-default">“{review.text}”</blockquote>
                </div>
                <figcaption className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className={cx(
                      "grid size-12 shrink-0 place-items-center rounded-full text-small font-bold",
                      index === 0 ? "bg-status-warning text-fg-default" : "bg-surface-soft text-fg-accent",
                    )}
                  >
                    {review.initials}
                  </span>
                  <span className="text-body font-bold text-fg-heading">{review.name}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </ProductSection>
  );
}
