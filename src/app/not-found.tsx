import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-lg text-gray-600">Page not found</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-[var(--color-navy)] px-6 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        Go home
      </Link>
    </div>
  );
}