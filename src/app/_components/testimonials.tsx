export function TestimonialsSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold tracking-widest text-[var(--color-rose-primary)] uppercase">
            Real Stories
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold text-[var(--color-navy)] sm:text-5xl">
            Lives We&apos;ve Touched
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-yellow-accent)]" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Yashoda's story */}
          <TestimonialCard
            name="Yashoda Perala"
            location="Nalgonda District, Telangana"
            story="Diagnosed with cervical cancer in 2013, Yashoda lacked the financial means and knowledge about treatment. Grace Cancer Foundation conducted a free health camp in her village, identified an appropriate cancer center, and initiated her chemotherapy. At 50, she found relief from both physical and emotional suffering."
            highlight="Free health camp saved my life"
          />

          <TestimonialCard
            name="Mobile COVID ICU Initiative"
            location="Hyderabad, 2020"
            story="During the pandemic, Grace Cancer Foundation launched the first-of-its-kind Mobile COVID ICU and donated 100 ventilators along with 5,000 PPE kits and N-95 masks in partnership with American Indian Foundation and Micron."
            highlight="100 ventilators donated"
          />

          <TestimonialCard
            name="365-Day Screening Campaign"
            location="Nizamabad, Telangana"
            story="A year-round cancer screening campaign conducted by Grace Cancer Foundation with Indur Cancer Hospital in association with the Government of Telangana — bringing continuous, accessible screening to the entire Nizamabad district."
            highlight="Year-round cancer screening"
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  location,
  story,
  highlight,
}: {
  name: string;
  location: string;
  story: string;
  highlight: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-yellow-accent)]" />

      {/* Quote icon */}
      <svg
        className="mb-4 h-8 w-8 text-[var(--color-rose-primary)] opacity-30"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      {/* Highlight badge */}
      <span className="inline-block rounded-full bg-[var(--color-rose-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-rose-primary)]">
        {highlight}
      </span>

      <p className="mt-4 text-sm leading-relaxed text-gray-600">{story}</p>

      <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-rose-primary)] to-[var(--color-rose-dark)] text-sm font-bold text-white">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--color-navy)]">
            {name}
          </p>
          <p className="text-xs text-gray-400">{location}</p>
        </div>
      </div>
    </div>
  );
}
