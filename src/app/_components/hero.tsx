import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[var(--color-navy)] via-[#1a2850] to-[#0d1528]"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[var(--color-rose-primary)] opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[var(--color-green-accent)] opacity-10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div className="animate-fade-in-up">
            {/* SSE badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-yellow-accent)]/30 bg-[var(--color-yellow-accent)]/10 px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-yellow-accent)] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-yellow-accent)]" />
              </span>
              <span className="text-sm font-medium text-[var(--color-yellow-accent)]">
                SEBI-Regulated Social Stock Exchange
              </span>
            </div>

            <h1 className="font-serif text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
              Invest in
              <span className="mt-2 block">
                <span className="bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-yellow-accent)] bg-clip-text text-transparent">
                  Social Impact
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-300">
              Grace Cancer Foundation is listing on India&apos;s{" "}
              <strong className="text-white">Social Stock Exchange (SSE)</strong>{" "}
              — a SEBI-regulated platform that enables organisations to raise
              capital for social causes with full transparency and
              accountability.
            </p>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-400">
              By expressing your interest, you signal your commitment to
              funding cancer education, early detection, treatment, and
              research for underserved communities across India.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/express"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-rose-dark)] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[var(--color-rose-primary)]/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[var(--color-rose-primary)]/30"
              >
                Express Your Interest
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <a
                href="#about"
                className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              >
                Learn more about us &darr;
              </a>
            </div>
          </div>

          {/* Right — SSE info card */}
          <div className="animate-fade-in-up stagger-3 hidden lg:block">
            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
                {/* What is SSE */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-bold text-white">
                    What is the Social Stock Exchange?
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    The SSE is a dedicated platform under SEBI that allows
                    non-profit organisations and social enterprises to raise
                    funds directly from the public — similar to how companies
                    list on the stock exchange, but for social good.
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  {[
                    {
                      icon: "🛡️",
                      title: "SEBI-Regulated",
                      desc: "Full regulatory oversight ensures compliance and investor protection",
                    },
                    {
                      icon: "📊",
                      title: "Complete Transparency",
                      desc: "Audited financials, annual impact reports, and public disclosures",
                    },
                    {
                      icon: "🎯",
                      title: "Direct Social Impact",
                      desc: "100% of funds directed toward cancer care programmes",
                    },
                    {
                      icon: "📜",
                      title: "Tax Benefits",
                      desc: "Contributions eligible for exemption under Section 80G of the IT Act",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-xl bg-white/5 p-3.5"
                    >
                      <span className="mt-0.5 text-lg">{item.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust badges */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {["12A Certified", "80G Exempt", "FCRA Registered"].map(
                    (badge) => (
                      <span
                        key={badge}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300"
                      >
                        {badge}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* Floating accents */}
              <div className="animate-float absolute -top-5 -right-5 rounded-2xl bg-gradient-to-br from-[var(--color-yellow-accent)] to-amber-500 p-3.5 shadow-xl">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div
                className="animate-float absolute -bottom-4 -left-4 rounded-2xl bg-gradient-to-br from-[var(--color-green-accent)] to-emerald-600 p-3.5 shadow-xl"
                style={{ animationDelay: "1.5s" }}
              >
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
