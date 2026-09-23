const methods = ["UPI", "VISA", "Mastercard", "RuPay", "AMEX", "COD"];

/** Neutral text marks — replace with licensed logos when going live. */
export function PaymentMarks() {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Accepted payment methods">
      {methods.map((m) => (
        <li
          key={m}
          className="rounded-md border border-cream/15 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-cream/70"
        >
          {m}
        </li>
      ))}
    </ul>
  );
}
