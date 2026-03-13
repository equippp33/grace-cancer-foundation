"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Lives Reached", value: 500000, suffix: "+", prefix: "", color: "var(--color-rose-primary)" },
  { label: "Volunteers", value: 10000, suffix: "+", prefix: "", color: "var(--color-green-accent)" },
  { label: "Events Conducted", value: 850, suffix: "+", prefix: "", color: "var(--color-yellow-accent)" },
  { label: "Cancers Detected", value: 5000, suffix: "+", prefix: "", color: "var(--color-blue-deep)" },
  { label: "Villages Covered", value: 2000, suffix: "+", prefix: "", color: "var(--color-rose-primary)" },
  { label: "Countries", value: 130, suffix: "+", prefix: "", color: "var(--color-green-accent)" },
];

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
  if (n >= 100000) return (n / 1000).toFixed(0) + "K";
  if (n >= 10000) return (n / 1000).toFixed(0) + "K";
  return n.toLocaleString();
}

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
            Our Reach
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold text-[var(--color-navy)] sm:text-5xl">
            The Impact We&apos;ve Made
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-yellow-accent)]" />
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <ImpactCard key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Donation tiers */}
        <div className="mt-20">
          <h3 className="mb-10 text-center font-serif text-3xl font-bold text-[var(--color-navy)]">
            Your Contribution, Their Hope
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { amount: "$10", desc: "Screen 1 Life" },
              { amount: "$10,000", desc: "Screen 1,000 Lives" },
              { amount: "$25,000", desc: "Support 10 Camps" },
              { amount: "$50,000", desc: "HPV Vaccine for 5,000 Girls" },
              { amount: "$250,000", desc: "Global Cancer Run" },
            ].map((tier, i) => (
              <div
                key={tier.amount}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-yellow-accent)] opacity-0 transition-opacity group-hover:opacity-100"
                />
                <p className="text-2xl font-bold text-[var(--color-navy)]">
                  {tier.amount}
                </p>
                <p className="mt-2 text-sm text-gray-500">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactCard({
  stat,
}: {
  stat: (typeof stats)[number];
}) {
  const { count, ref } = useCountUp(stat.value);

  return (
    <div ref={ref} className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
      <p className="text-3xl font-bold lg:text-4xl" style={{ color: stat.color }}>
        {stat.prefix}
        {formatNumber(count)}
        {stat.suffix}
      </p>
      <p className="mt-2 text-xs font-medium text-gray-500 uppercase">
        {stat.label}
      </p>
    </div>
  );
}
