export function VolunteerSection() {
  return (
    <section id="volunteer" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-rose-primary)] to-[var(--color-rose-dark)]">
          <div className="grid items-center lg:grid-cols-2">
            {/* Left content */}
            <div className="p-10 sm:p-14">
              <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white">
                Join Us
              </span>
              <h2 className="mt-6 font-serif text-3xl font-bold text-white sm:text-4xl">
                Together We Make a Difference
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Your time, skills, and dedication can have a profound impact on
                humankind. Volunteer with Grace Cancer Foundation today.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  "Admin Support",
                  "Event Help",
                  "Corporate Groups",
                  "Student Placement",
                  "Design Skills",
                  "Retail Support",
                ].map((role) => (
                  <div
                    key={role}
                    className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-sm text-white backdrop-blur-sm"
                  >
                    <svg
                      className="h-4 w-4 shrink-0 text-[var(--color-yellow-accent)]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {role}
                  </div>
                ))}
              </div>
            </div>

            {/* Right - reasons */}
            <div className="bg-white/10 p-10 backdrop-blur-sm sm:p-14">
              <h3 className="mb-8 text-xl font-bold text-white">
                Why Volunteer?
              </h3>
              <div className="space-y-6">
                <ReasonCard
                  title="A Positive Step"
                  description="Engagement with those in need allows you to step outside your routine life and reflect personally."
                  icon="✨"
                />
                <ReasonCard
                  title="New Experiences"
                  description="Your life problems that may seem huge today will start to feel trivial when you spend time with cancer patients."
                  icon="🌱"
                />
                <ReasonCard
                  title="Happiness Booster"
                  description="There's unique fulfillment in working for a better future for the unfortunate."
                  icon="💖"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReasonCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg">
        {icon}
      </span>
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-white/70">{description}</p>
      </div>
    </div>
  );
}
