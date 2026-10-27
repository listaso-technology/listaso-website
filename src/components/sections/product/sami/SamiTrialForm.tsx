"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type SyntheticEvent,
} from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { cx } from "@/lib/utils/cx";

export const SAMI_TRIAL_USER_RANGES = [
  "1 to 6 users",
  "7 to 20 users",
  "21 to 40 users",
  "More than 40 users",
] as const;

const CUSTOMER_TYPES = [
  { value: "existing", label: "Yes, current customer" },
  { value: "new", label: "No, new to Listaso" },
] as const;

type SamiTrialFormProps = {
  /** Zoho `htmlRecords/submit` endpoint. Field names below must match the Zoho form. */
  submitUrl: string;
  /** Public Zoho form page, offered as a fallback if the submission fails. */
  fallbackUrl: string;
  termsHref: string;
  privacyHref: string;
};

type Errors = Partial<
  Record<
    | "customer"
    | "first"
    | "last"
    | "email"
    | "company"
    | "date"
    | "time"
    | "terms",
    string
  >
>;
type Phase = "idle" | "sending" | "sent" | "failed";

const RECEIVED_PATH = "/sami-trial-received/";
const BRIDGE_NAME = "sami-trial-bridge";
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isWeekend(iso: string) {
  const day = new Date(`${iso}T12:00:00`).getDay();
  return day === 0 || day === 6;
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function todayIso() {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** `2026-10-23` -> `23-Oct-2026`, the dd-MMM-yyyy format the Zoho date field expects. */
function toZohoDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${day}-${MONTHS[Number(month) - 1]}-${year}`;
}

/** `14:05` -> 12-hour parts matching the Zoho hour, minute and AM/PM selects. */
function toZohoTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  const meridiem = hours >= 12 ? "PM" : "AM";
  return {
    hours: pad(hours % 12 === 0 ? 12 : hours % 12),
    minutes: pad(minutes),
    meridiem,
  };
}

/** Native version of the Zoho "Start Your 14-Day SAMI Free Trial" form; records still land in Zoho. */
export function SamiTrialForm({
  submitUrl,
  fallbackUrl,
  termsHref,
  privacyHref,
}: SamiTrialFormProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const bridgeRef = useRef<HTMLFormElement>(null);
  const phaseRef = useRef<Phase>("idle");
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  function validate(data: FormData): Errors {
    const text = (key: string) => String(data.get(key) ?? "").trim();
    const next: Errors = {};
    if (!text("customer"))
      next.customer = "Tell us whether you are a current Listaso customer.";
    if (!text("first")) next.first = "Enter your first name.";
    if (!text("last")) next.last = "Enter your last name.";
    if (!text("email")) next.email = "Enter your business email.";
    else if (!EMAIL_PATTERN.test(text("email")))
      next.email = "Enter a valid email address.";
    if (!text("company")) next.company = "Enter your company name.";
    if (!text("date")) next.date = "Choose a day for your demo.";
    else if (text("date") < todayIso())
      next.date = "Choose today or a later day.";
    else if (isWeekend(text("date")))
      next.date = "Demos are available Monday to Friday.";
    if (!text("time")) next.time = "Choose a time for your demo.";
    else if (text("time") < "07:00" || text("time") > "17:00")
      next.time = "Demos are available between 7:00 AM and 5:00 PM.";
    if (!data.get("terms"))
      next.terms =
        "Accept the Terms and Conditions and Privacy Policy to continue.";
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = found.customer
        ? "input[name='customer']"
        : "[aria-invalid='true']";
      form.querySelector<HTMLElement>(first)?.focus();
      return;
    }

    const time = toZohoTime(String(data.get("time")));
    const fields: Record<string, string> = {
      zf_referrer_name: "listaso.com/sami",
      // Zoho redirects here after accepting the record; see SamiTrialReceivedPage.
      zf_redirect_url: `${window.location.origin}${RECEIVED_PATH}`,
      zc_gad: "",
      Name1_First: String(data.get("first")).trim(),
      Name1_Last: String(data.get("last")).trim(),
      Email1: String(data.get("email")).trim(),
      SingleLine1: String(data.get("company")).trim(),
      PhoneNumber_countrycode: String(data.get("phone") ?? "").trim(),
      DateTime_date: toZohoDate(String(data.get("date"))),
      DateTime_hours: time.hours,
      DateTime_minutes: time.minutes,
      DateTime_meridiem: time.meridiem,
      TermsConditions: "true",
    };
    // Zoho routes the notification to the right sales rep from this checkbox.
    if (data.get("customer") === "existing") fields.DecisionBox = "true";
    if (data.get("users")) fields.Radio = String(data.get("users"));

    const bridge = bridgeRef.current;
    if (!bridge) return;
    bridge.replaceChildren(
      ...Object.entries(fields).map(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        return input;
      }),
    );

    setPhase("sending");
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setPhase("failed"), 30000);
    bridge.submit();
  }

  /**
   * The hidden iframe lands on our own same-origin page when Zoho accepts the
   * record. Anything else (Zoho's error page) is cross-origin and unreadable,
   * which is how a rejected submission is told apart from an accepted one.
   */
  function onBridgeLoad(event: SyntheticEvent<HTMLIFrameElement>) {
    if (phaseRef.current !== "sending") return;
    window.clearTimeout(timeoutRef.current);
    let accepted = false;
    try {
      accepted =
        event.currentTarget.contentWindow?.location.pathname === RECEIVED_PATH;
    } catch {
      accepted = false;
    }
    if (accepted) formRef.current?.reset();
    setPhase(accepted ? "sent" : "failed");
  }

  if (phase === "sent") {
    return (
      <div role="status">
        <StatusMessage status="success" title="Request received">
          Our team will contact you with the next steps to start your SAMI free
          trial.
        </StatusMessage>
      </div>
    );
  }

  const sending = phase === "sending";

  return (
    <>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        className="flex flex-col gap-6"
        aria-label="Start Your 14-Day SAMI Free Trial"
      >
        <fieldset
          disabled={sending}
          className="flex min-w-0 flex-col gap-6 disabled:opacity-70"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="trial-first"
              name="first"
              label="First name"
              autoComplete="given-name"
              required
              error={errors.first}
            />
            <FormField
              id="trial-last"
              name="last"
              label="Last name"
              autoComplete="family-name"
              required
              error={errors.last}
            />
          </div>
          <FormField
            id="trial-email"
            name="email"
            type="email"
            label="Business email"
            autoComplete="email"
            required
            error={errors.email}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="trial-company"
              name="company"
              label="Company name"
              autoComplete="organization"
              required
              error={errors.company}
            />
            <FormField
              id="trial-phone"
              name="phone"
              type="tel"
              label="Phone"
              autoComplete="tel"
              maxLength={20}
            />
          </div>

          <fieldset
            className="flex flex-col gap-3"
            aria-describedby={
              errors.customer ? "trial-customer-error" : undefined
            }
          >
            <legend className="text-small font-semibold text-fg-default">
              Are you a current Listaso customer?{" "}
              <span className="font-normal text-fg-muted">(required)</span>
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {CUSTOMER_TYPES.map((type) => (
                <label
                  key={type.value}
                  className="flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border border-line-control bg-surface-raised px-4 text-body text-fg-default transition-colors hover:border-fg-default has-[:checked]:border-fg-heading has-[:checked]:bg-surface-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-focus-ring"
                >
                  <input
                    type="radio"
                    name="customer"
                    value={type.value}
                    aria-describedby={
                      errors.customer ? "trial-customer-error" : undefined
                    }
                    className="size-5 shrink-0 accent-action-primary"
                  />
                  {type.label}
                </label>
              ))}
            </div>
            {errors.customer ? (
              <p
                id="trial-customer-error"
                className="text-small text-status-error"
              >
                {errors.customer}
              </p>
            ) : null}
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="text-small font-semibold text-fg-default">
              Number of users needed
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {SAMI_TRIAL_USER_RANGES.map((range) => (
                <label
                  key={range}
                  className="flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border border-line-control bg-surface-raised px-4 text-body text-fg-default transition-colors hover:border-fg-default has-[:checked]:border-fg-heading has-[:checked]:bg-surface-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-focus-ring"
                >
                  <input
                    type="radio"
                    name="users"
                    value={range}
                    className="size-5 shrink-0 accent-action-primary"
                  />
                  {range}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="text-small font-semibold text-fg-default">
              Request a demo
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="trial-date"
                name="date"
                type="date"
                label="Day"
                required
                error={errors.date}
              />
              <FormField
                id="trial-time"
                name="time"
                type="time"
                label="Time"
                required
                error={errors.time}
              />
            </div>
          </fieldset>

          <div className="flex flex-col gap-2">
            <label className="flex items-start gap-3 text-small text-fg-default">
              <input
                type="checkbox"
                name="terms"
                aria-invalid={errors.terms ? true : undefined}
                aria-describedby={
                  errors.terms ? "trial-terms-error" : undefined
                }
                className={cx(
                  "mt-0.5 size-5 shrink-0 accent-action-primary",
                  errors.terms && "outline-2 outline-status-error",
                )}
              />
              <span>
                I accept the{" "}
                <a
                  className="font-semibold underline underline-offset-4"
                  href={termsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  className="font-semibold underline underline-offset-4"
                  href={privacyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {errors.terms ? (
              <p
                id="trial-terms-error"
                className="text-small text-status-error"
              >
                {errors.terms}
              </p>
            ) : null}
          </div>
        </fieldset>

        <div aria-live="polite">
          {phase === "failed" ? (
            <StatusMessage status="error" title="We couldn't send your request">
              Check your connection and try again, or{" "}
              <a
                className="font-semibold underline underline-offset-4"
                href={fallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                use the Zoho form
              </a>
              .
            </StatusMessage>
          ) : null}
        </div>

        <div>
          <Button type="submit" size="lg" disabled={sending}>
            {sending ? "Sending…" : "Start my free trial"}
          </Button>
        </div>
      </form>
      <form
        ref={bridgeRef}
        action={submitUrl}
        method="POST"
        encType="multipart/form-data"
        acceptCharset="UTF-8"
        target={BRIDGE_NAME}
        hidden
      />
      <iframe
        name={BRIDGE_NAME}
        title="Form submission"
        tabIndex={-1}
        aria-hidden="true"
        hidden
        onLoad={onBridgeLoad}
      />
    </>
  );
}
