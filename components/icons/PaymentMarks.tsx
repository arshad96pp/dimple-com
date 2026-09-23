const methods = ["UPI", "Visa", "Mastercard", "RuPay", "Amex", "COD"];

/** Neutral text marks — replace with licensed logos when going live. */
export function PaymentMarks() {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Accepted payment methods">
      {methods.map((m) => (
        <li
          key={m}
          className="rounded-md border border-ink/10 bg-paper px-2.5 py-1 text-[11px] font-medium tracking-wide text-ink-soft"
        >
          {m}
        </li>
      ))}
    </ul>
  );
}
