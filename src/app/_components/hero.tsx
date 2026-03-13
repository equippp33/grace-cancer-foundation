import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[var(--color-navy)] via-[#1a2850] to-[#0d1528]"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[var(--color-rose-primary)] opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[var(--color-green-accent)] opacity-10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-yellow-accent)] opacity-5 blur-3xl" />

        {/* Subtle pattern overlay */}
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-green-accent)]/30 bg-[var(--color-green-accent)]/10 px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-green-accent)] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-green-accent)]" />
              </span>
              <span className="text-sm font-medium text-[var(--color-green-accent)]">
                Cure &bull; Care &bull; Compassion
              </span>
            </div>

            <h1 className="font-serif text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
              Transforming Lives
              <span className="mt-2 block">
                in the{" "}
                <span className="bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-yellow-accent)] bg-clip-text text-transparent">
                  Cancer Journey
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-300">
              Grace Cancer Foundation is dedicated to combating cancer through
              Education, Early Detection, Treatment, Rehabilitation, and
              Cutting-Edge Research across India and beyond.
            </p>

            {/* SSE Banner */}
            <div className="mt-8 rounded-2xl border border-[var(--color-yellow-accent)]/20 bg-gradient-to-r from-[var(--color-yellow-accent)]/10 to-[var(--color-rose-primary)]/10 p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-yellow-accent)]/20">
                  <svg
                    className="h-6 w-6 text-[var(--color-yellow-accent)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Now Registering Under{" "}
                    <span className="text-[var(--color-yellow-accent)]">
                      Social Stock Exchange (SSE)
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Grace Cancer Foundation is getting registered under SEBI&apos;s
                    Social Stock Exchange — enabling transparent, regulated
                    social impact investing for a cancer-free world.
                  </p>
                </div>
              </div>
              <Link
                href="/express"
                className="animate-pulse-glow mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-rose-dark)] px-8 py-3.5 text-base font-bold text-white shadow-2xl transition-all hover:scale-105"
              >
                Express Now
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
            </div>
          </div>

          {/* Right visual */}
          <div className="animate-fade-in-up stagger-3 hidden lg:block">
            <div className="relative">
              {/* Main card */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <StatCard
                    number="850+"
                    label="Events Conducted"
                    color="var(--color-rose-primary)"
                  />
                  <StatCard
                    number="6"
                    label="Mobile Screening Units"
                    color="var(--color-green-accent)"
                  />
                  <StatCard
                    number="130+"
                    label="Countries Reached"
                    color="var(--color-yellow-accent)"
                  />
                  <StatCard
                    number="150K+"
                    label="Run Participants"
                    color="var(--color-blue-deep)"
                  />
                </div>

                {/* Guinness badge */}
                <div className="mt-6 flex items-center gap-3 rounded-xl bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-yellow-accent)]/20">
                    <span className="text-lg">🏆</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Multiple Guinness World Records
                    </p>
                    <p className="text-xs text-gray-400">
                      For cancer awareness campaigns
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating accent elements */}
              <div className="animate-float absolute -top-6 -right-6 rounded-2xl bg-gradient-to-br from-[var(--color-rose-primary)] to-[var(--color-rose-dark)] p-4 shadow-xl">
                <span className="text-2xl">💖</span>
              </div>
              <div
                className="animate-float absolute -bottom-4 -left-4 rounded-2xl bg-gradient-to-br from-[var(--color-green-accent)] to-emerald-600 p-4 shadow-xl"
                style={{ animationDelay: "1.5s" }}
              >
                <span className="text-2xl">🎗️</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#about" className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-gray-500 uppercase">
            Scroll
          </span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-gray-500 p-1">
            <div className="h-2 w-1 animate-bounce rounded-full bg-gray-400" />
          </div>
        </a>
      </div>
    </section>
  );
}

function StatCard({
  number,
  label,
  color,
}: {
  number: string;
  label: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
      <p className="text-3xl font-bold" style={{ color }}>
        {number}
      </p>
      <p className="mt-1 text-xs text-gray-400">{label}</p>
    </div>
  );
}
