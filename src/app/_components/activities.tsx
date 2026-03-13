export function ActivitiesSection() {
  return (
    <section
      id="activities"
      className="relative bg-gradient-to-b from-gray-50 to-white py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold tracking-widest text-[var(--color-rose-primary)] uppercase">
            What We Do
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold text-[var(--color-navy)] sm:text-5xl">
            Our Core Activities
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-yellow-accent)]" />
          <p className="mx-auto mt-6 max-w-2xl text-gray-500">
            We fight cancer through five pillars — Education, Early Detection,
            Treatment, Rehabilitation, and Cutting-Edge Research.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ActivityCard
            icon={
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            }
            title="Education & Awareness"
            description="Empowering individuals and communities with knowledge about cancer prevention, symptoms, and early warning signs."
            color="var(--color-rose-primary)"
            bgColor="rgba(239,82,131,0.08)"
          />
          <ActivityCard
            icon={
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            }
            title="Early Detection"
            description="Operating 4+ mobile screening units across rural India, conducting 850+ events including free cancer screening camps."
            color="var(--color-green-accent)"
            bgColor="rgba(98,206,112,0.08)"
          />
          <ActivityCard
            icon={
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            }
            title="Treatment & Rehab"
            description="Free medical camps offering chemotherapy, radiation therapy, surgeries, counseling, nutrition guidance, and physiotherapy."
            color="var(--color-yellow-accent)"
            bgColor="rgba(236,195,31,0.08)"
          />
          <ActivityCard
            icon={
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            }
            title="Cutting Edge Research"
            description="50,000 sq.ft research facility with ICU, conducting clinical trials across oncology, neurology, cardiology and more."
            color="var(--color-blue-deep)"
            bgColor="rgba(4,107,210,0.08)"
          />
        </div>

        {/* Key challenge callout */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[var(--color-navy)] to-[#1a2850] p-8 sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                Why Early Detection Matters
              </h3>
              <p className="mt-4 text-gray-300">
                Cancer kills over 800,000 Indians annually. Most cases are
                detected late due to lack of awareness and limited access to
                screening services — especially in rural areas.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🚫", text: "Lack of awareness" },
                { icon: "🏥", text: "Limited access to screening" },
                { icon: "⏳", text: "Low priority for prevention" },
                { icon: "🚬", text: "Tobacco & alcohol use" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 rounded-xl bg-white/10 p-3"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm text-gray-200">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ActivityCard({
  icon,
  title,
  description,
  color,
  bgColor,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: bgColor, color }}
      >
        {icon}
      </div>
      <h3 className="font-serif text-xl font-bold text-[var(--color-navy)]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-500">
        {description}
      </p>
    </div>
  );
}
