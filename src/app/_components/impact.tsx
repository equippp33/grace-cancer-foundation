"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

function formatNumber(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return n.toLocaleString();
}

const achievements = [
  {
    title: "Guinness World Record",
    desc: "Largest breast cancer awareness lesson — a landmark achievement in cancer education and screening",
  },
  {
    title: "Limca Book of Records 2016",
    desc: "Largest Cervical Cancer Screening Campaign — 15 cases detected and referred for treatment",
  },
  {
    title: "Largest Oral Cancer Screening 2019",
    desc: "Massive oral cancer screening campaign — 30 cases detected and treated early",
  },
  {
    title: "ISO Certified Organisation",
    desc: "Certified for quality management and operational excellence in healthcare delivery",
  },
  {
    title: "Cancer Run 2018",
    desc: "4 buses, 5 continents, 10 nations — a global movement for cancer awareness",
  },
  {
    title: "Largest Global Cancer Run 2019",
    desc: "25,000+ participants across the globe — uniting communities against cancer",
  },
  {
    title: "Guinness World Records Case Study",
    desc: "Featured as an official case study by Guinness World Records for impact and scale",
  },
];

const quickStats = [
  { label: "Continents", value: 5, suffix: "", color: "var(--color-rose-primary)" },
  { label: "Nations", value: 10, suffix: "+", color: "var(--color-green-accent)" },
  { label: "Participants (2019 Run)", value: 25000, suffix: "+", color: "var(--color-yellow-accent)" },
  { label: "Cases Detected", value: 45, suffix: "+", color: "var(--color-blue-deep)" },
];

export function ImpactSection() {
  return (
    <section id="impact" className="relative overflow-hidden bg-white py-24">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[var(--color-rose-primary)] to-[var(--color-yellow-accent)] opacity-5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold tracking-widest text-[var(--color-rose-primary)] uppercase">
            Recognition &amp; Impact
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold text-[var(--color-navy)] sm:text-5xl">
            Our Achievements
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-yellow-accent)]" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
            From Guinness World Records to nationwide screening campaigns, our
            work has been recognised at the highest levels.
          </p>
        </div>

        {/* Stats row */}
        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {quickStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Achievements as a clean list */}
        <div className="mx-auto max-w-3xl">
          <div className="divide-y divide-gray-100">
            {achievements.map((item, i) => (
              <div
                key={item.title}
                className="group flex items-start gap-4 py-5 transition-colors hover:bg-gray-50/50 sm:gap-6 sm:px-4"
              >
                {/* Numbered marker */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-rose-primary)] to-[var(--color-rose-dark)] text-sm font-bold text-white shadow-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div>
                  <h4 className="text-base font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-rose-primary)] transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
}: {
  stat: (typeof quickStats)[number];
}) {
  const { count, ref } = useCountUp(stat.value);

  return (
    <div ref={ref} className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
      <p className="text-3xl font-bold lg:text-4xl" style={{ color: stat.color }}>
        {formatNumber(count)}
        {stat.suffix}
      </p>
      <p className="mt-2 text-xs font-medium text-gray-500 uppercase">
        {stat.label}
      </p>
    </div>
  );
}
