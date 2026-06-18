export function IssueSection() {
  const financials = [
    { label: "Issue Size", value: "₹1 Crore", highlight: true },
    { label: "Instrument", value: "ZCZP on NSE SSE" },
    { label: "Minimum Contribution", value: "₹1,000" },
    { label: "Mode of Holding", value: "Dematerialised (Demat)" },
    { label: "Issue Dates", value: "To be announced" },
  ];

  const project = [
    { label: "Project", value: "Rural Cancer Screening & Early Detection Programme, Telangana" },
    { label: "Duration", value: "12 Months" },
    { label: "Direct Beneficiaries", value: "10,000+ individuals screened" },
    { label: "Indirect Beneficiaries", value: "40,000+ family & community members" },
    { label: "Villages Covered", value: "150+ underserved rural villages" },
    { label: "Camps Conducted", value: "200+ awareness & screening camps" },
  ];

  return (
    <section className="relative bg-[var(--color-navy)] py-20 overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[var(--color-rose-primary)] opacity-5 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[var(--color-yellow-accent)] opacity-5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold tracking-widest text-[var(--color-yellow-accent)] uppercase">
            SSE Issue Summary
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold text-white sm:text-5xl">
            About the Issue
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-yellow-accent)]" />
          <p className="mt-5 max-w-2xl mx-auto text-base text-gray-400 leading-relaxed">
            Grace Cancer Foundation is raising ₹1 Crore through ZCZP Instruments on the NSE Social Stock Exchange to fund a rural cancer screening programme across Telangana.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Financial details */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-5 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-yellow-accent)]/15">
                <svg className="h-4 w-4 text-[var(--color-yellow-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Issue Details</h3>
            </div>
            <div className="space-y-0 divide-y divide-white/8">
              {financials.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3.5">
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.highlight ? "text-[var(--color-yellow-accent)] text-base font-bold" : "text-white"}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Project details */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-5 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-rose-primary)]/15">
                <svg className="h-4 w-4 text-[var(--color-rose-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Project & Impact</h3>
            </div>
            <div className="space-y-0 divide-y divide-white/8">
              {project.map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-4 py-3.5">
                  <span className="shrink-0 text-sm text-gray-400">{item.label}</span>
                  <span className="text-right text-sm font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Use of funds + Expected impact */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-[var(--color-green-accent)]">Use of Funds</h4>
            <p className="text-sm leading-relaxed text-gray-300">
              Cancer screening, mobile outreach camps, medical personnel, awareness programmes, technology-enabled monitoring, patient support and follow-up care.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-[var(--color-rose-primary)]">Expected Impact</h4>
            <p className="text-sm leading-relaxed text-gray-300">
              Increased cancer awareness, early detection, timely referrals, improved treatment outcomes and enhanced access to preventive healthcare in rural Telangana.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
