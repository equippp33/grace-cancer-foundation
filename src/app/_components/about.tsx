export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[var(--color-rose-primary)] opacity-5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold tracking-widest text-[var(--color-rose-primary)] uppercase">
            Who We Are
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold text-[var(--color-navy)] sm:text-5xl">
            About Grace Cancer Foundation
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-yellow-accent)]" />
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left - Story */}
          <div>
            <p className="text-lg leading-relaxed text-gray-600">
              The Grace Cancer Foundation emerged from a dedicated group of
              doctors extending their work beyond professional duties. Many
              founders drew inspiration from personal experiences with cancer —
              Dr. Chinnababu&apos;s mother inspired the mobile screening
              campaign, demonstrating how shared suffering unites people toward
              purpose.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Since our inauguration in{" "}
              <strong className="text-[var(--color-navy)]">2013</strong>, we
              have grown from an NGO to a social enterprise with{" "}
              <strong className="text-[var(--color-navy)]">
                12A &amp; 80G tax exemptions
              </strong>{" "}
              and{" "}
              <strong className="text-[var(--color-navy)]">
                FCRA registration
              </strong>{" "}
              for receiving foreign donations.
            </p>

            {/* Mission & Vision */}
            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border-l-4 border-[var(--color-rose-primary)] bg-rose-50 p-5">
                <h3 className="font-serif text-lg font-bold text-[var(--color-navy)]">
                  Our Mission
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Improving quality of life for cancer patients, advancing
                  research, and promoting early detection while fostering
                  community strength and compassion.
                </p>
              </div>
              <div className="rounded-2xl border-l-4 border-[var(--color-green-accent)] bg-green-50 p-5">
                <h3 className="font-serif text-lg font-bold text-[var(--color-navy)]">
                  Our Vision
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  To ensure every cancer patient receives optimal care and
                  emotional support, working toward minimizing cancer&apos;s
                  impact on communities worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Founders & Milestones */}
          <div>
            <h3 className="mb-6 font-serif text-2xl font-bold text-[var(--color-navy)]">
              Our Founders
            </h3>
            <div className="space-y-4">
              <FounderCard
                name="Shri. B L Sujatha Rao"
                role="Retired IGP"
                initial="B"
                color="var(--color-rose-primary)"
              />
              <FounderCard
                name="Dr. Chinnababu Sunkavalli"
                role="Clinical Director, Robotic Surgical Oncologist"
                initial="C"
                color="var(--color-green-accent)"
              />
              <FounderCard
                name="Dr. Prameela Rani Sunkavalli"
                role="Practicing Dentist, Management Representative"
                initial="P"
                color="var(--color-blue-deep)"
              />
            </div>

            {/* Timeline highlights */}
            <h3 className="mt-10 mb-6 font-serif text-2xl font-bold text-[var(--color-navy)]">
              Key Milestones
            </h3>
            <div className="space-y-3">
              {[
                { year: "2013", text: "Foundation inaugurated" },
                { year: "2015", text: "First mobile screening bus launched" },
                { year: "2018", text: "FCRA registration obtained" },
                {
                  year: "2020",
                  text: "COVID relief — 100 ventilators, mobile ICU",
                },
                {
                  year: "2025",
                  text: "8th Global Grace Cancer Run across 130+ countries",
                },
              ].map((item) => (
                <div key={item.year} className="flex items-start gap-3">
                  <span className="shrink-0 rounded-lg bg-[var(--color-navy)] px-3 py-1 text-xs font-bold text-white">
                    {item.year}
                  </span>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              ))}
              {/* 2026 — SSE Registration (in progress) */}
              <div className="flex items-start gap-3">
                <span className="relative shrink-0 overflow-hidden rounded-lg bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-rose-dark)] px-3 py-1 text-xs font-bold text-white">
                  2026
                  <span className="absolute inset-0 animate-pulse rounded-lg bg-white/20" />
                </span>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-[var(--color-rose-primary)]">
                    Registration under Social Stock Exchange (SSE)
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                    </span>
                    In Progress
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FounderCard({
  name,
  role,
  initial,
  color,
}: {
  name: string;
  role: string;
  initial: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4 transition-all hover:shadow-md">
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {initial}
      </div>
      <div>
        <p className="font-semibold text-[var(--color-navy)]">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
}
