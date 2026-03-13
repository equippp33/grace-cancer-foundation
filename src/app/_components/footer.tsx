import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-rose-primary)] to-[var(--color-rose-dark)]">
                <span className="text-lg font-bold text-white">G</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white">
                  Grace Cancer
                </span>
                <span className="block text-[10px] tracking-widest text-[var(--color-rose-primary)] uppercase">
                  Foundation
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Compassion, Support, and Hope — Transforming Lives in the Cancer
              Journey.
            </p>
            <p className="mt-3 text-xs text-gray-500">
              Donations exempt under 12A &amp; 80G of IT Act 1961. FCRA
              Registered.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-widest text-white uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About", href: "#about" },
                { label: "Our Activities", href: "#activities" },
                { label: "Impact", href: "#impact" },
                { label: "Cancer Run", href: "#cancer-run" },
                { label: "Volunteer", href: "#volunteer" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[var(--color-rose-primary)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-widest text-white uppercase">
              Programs
            </h4>
            <ul className="space-y-2.5">
              {[
                "Education & Awareness",
                "Early Detection",
                "Treatment & Rehab",
                "Cutting Edge Research",
                "Grace Cancer Run",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-widest text-white uppercase">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p>Flat 405, Vindhya Apartments</p>
              <p>Ameerpet, Hyderabad 500016</p>
              <p>+91 9000011223</p>
              <p>info@gracecancerfoundation.org</p>
            </div>
            <Link
              href="/express"
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-rose-dark)] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
            >
              Express Now
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Grace Cancer Foundation. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
