import Link from "next/link";

export function CancerRunSection() {
  return (
    <section
      id="cancer-run"
      className="relative overflow-hidden bg-gradient-to-br from-[var(--color-navy)] via-[#1a2850] to-[#0d1528] py-24"
    >
      {/* Decorative shapes */}
      <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-[var(--color-rose-primary)] opacity-10 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-[var(--color-yellow-accent)] opacity-10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-[var(--color-yellow-accent)]">
              <span>🏃</span> 8th Edition — 2025
            </span>

            <h2 className="mt-6 font-serif text-4xl font-bold text-white sm:text-5xl">
              Global Grace
              <span className="mt-2 block bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-yellow-accent)] bg-clip-text text-transparent">
                Cancer Run
              </span>
            </h2>

            <p className="mt-2 text-xl font-light text-gray-300 italic">
              &ldquo;One Vision. One Race. One Global Impact.&rdquo;
            </p>

            <p className="mt-6 text-gray-400">
              Every step taken in the Grace Cancer Run is a stride toward a
              cancer-free world. Funds support free cancer screening programs for
              underprivileged communities across India and beyond.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="rounded-xl bg-white/10 px-5 py-3 text-center backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">130+</p>
                <p className="text-xs text-gray-400">Countries</p>
              </div>
              <div className="rounded-xl bg-white/10 px-5 py-3 text-center backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">150K+</p>
                <p className="text-xs text-gray-400">Participants</p>
              </div>
              <div className="rounded-xl bg-white/10 px-5 py-3 text-center backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">Oct 12</p>
                <p className="text-xs text-gray-400">Race Day</p>
              </div>
            </div>
          </div>

          {/* Right - Race categories */}
          <div className="space-y-4">
            <RaceCard
              distance="2K"
              title="Fun Run"
              description="For families, children, and seniors — everyone can join!"
              color="var(--color-green-accent)"
              icon="👨‍👩‍👧‍👦"
            />
            <RaceCard
              distance="5K"
              title="Run"
              description="Perfect for casual runners and fitness enthusiasts."
              color="var(--color-yellow-accent)"
              icon="🏃"
            />
            <RaceCard
              distance="10K"
              title="Timed Run"
              description="Competitive timed race for experienced runners."
              color="var(--color-rose-primary)"
              icon="🏅"
            />

            {/* Partners */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Key Partners
              </p>
              <div className="flex flex-wrap gap-3">
                {["Quambiant", "Evernorth", "Yashoda Hospitals"].map((p) => (
                  <span
                    key={p}
                    className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-gray-300"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RaceCard({
  distance,
  title,
  description,
  color,
  icon,
}: {
  distance: string;
  title: string;
  description: string;
  color: string;
  icon: string;
}) {
  return (
    <div className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white transition-transform group-hover:scale-110"
        style={{ backgroundColor: color }}
      >
        {distance}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-white">
          {icon} {title}
        </p>
        <p className="mt-1 text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}
