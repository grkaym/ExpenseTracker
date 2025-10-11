import {
  ArrowRight,
  Github,
  LogIn,
  PlayCircle,
  Rocket,
  Shield,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react';

export default function Landing() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100">
              <Wallet className="h-4 w-4" />
            </span>
            Expense Tracker
          </a>
          <nav className="hidden items-center gap-6 text-sm text-gray-600 md:flex">
            <a href="#features" className="hover:text-gray-900">
              Features
            </a>
            <a href="#screens" className="hover:text-gray-900">
              Screens
            </a>
            <a href="#faq" className="hover:text-gray-900">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
            >
              <LogIn className="h-4 w-4" /> Log in
            </a>
            <a
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black"
            >
              Sign up
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 ring-1 ring-amber-200">
              <Sparkles className="h-3 w-3" /> Built with Laravel 12 + React
              (Inertia)
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Track your spending. Stay in control.
            </h1>
            <p className="mt-4 text-gray-600 md:text-lg">
              A clean, fast expense tracker for everyday budgeting. Minimal UI,
              powerful features: categories, income/expense, recurring rules,
              and a demo you can try instantly.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="/demo/login"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
              >
                <PlayCircle className="h-4 w-4" /> Try Demo
              </a>
              <a
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
              >
                <Rocket className="h-4 w-4" /> Create account
              </a>
              <a
                href="https://github.com/grkaym/ExpenseTracker"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500">
              <li>Tailwind</li>
              <li>MySQL</li>
              <li>Recharts</li>
              <li>AWS Lightsail</li>
            </ul>
          </div>
          {/* Screenshot placeholder */}
          <div className="relative">
            <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-50">
                {/* Replace with real app screenshot */}
                <div className="flex h-full items-center justify-center text-gray-400">
                  App screenshot
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 hidden w-40 rotate-3 rounded-xl border border-gray-200 bg-white p-2 shadow-sm md:block">
              <div className="aspect-[4/3] w-full rounded-lg bg-gray-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold">What you get</h2>
            <p className="mt-3 text-gray-600">
              Focused features that matter for day-to-day budgeting and a clean
              portfolio showcase.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<TrendingUp className="h-5 w-5" />}
              title="Quick entry"
            >
              Add expenses/income with one form. Categories, notes, and USD
              amounts.
            </FeatureCard>
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="Auth & Demo"
            >
              Breeze authentication. One-click demo account to explore safely.
            </FeatureCard>
            <FeatureCard
              icon={<Sparkles className="h-5 w-5" />}
              title="Recurring rules"
            >
              Schedule monthly/weekly transactions. Edit or pause anytime.
            </FeatureCard>
            <FeatureCard icon={<Wallet className="h-5 w-5" />} title="Clean UI">
              Tailwind cards, mobile-friendly lists, and simple dashboards.
            </FeatureCard>
            <FeatureCard
              icon={<Rocket className="h-5 w-5" />}
              title="Deployed on AWS"
            >
              Production build on Lightsail, ready for real-world traffic.
            </FeatureCard>
            <FeatureCard
              icon={<Github className="h-5 w-5" />}
              title="Readable code"
            >
              Laravel 12 + Inertia + React. Clear controllers and migrations.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Screens */}
      <section id="screens" className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold">Screens</h2>
            <a
              href="/demo"
              className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
            >
              Try it now <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ScreenCard title="Dashboard" subtitle="Monthly summary, charts">
              <div className="aspect-video w-full rounded-xl bg-white" />
            </ScreenCard>
            <ScreenCard
              title="Transactions"
              subtitle="List, filters, quick add"
            >
              <div className="aspect-video w-full rounded-xl bg-white" />
            </ScreenCard>
            <ScreenCard title="Categories" subtitle="Create & manage">
              <div className="aspect-[4/3] w-full rounded-xl bg-white" />
            </ScreenCard>
            <ScreenCard title="Recurring Rules" subtitle="Automate fixed costs">
              <div className="aspect-[4/3] w-full rounded-xl bg-white" />
            </ScreenCard>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <dl className="mt-6 divide-y divide-gray-100 rounded-2xl border border-gray-100">
            <FAQ
              q="Is there a demo?"
              a="Yes. Click 'Try Demo' to auto-login with sample data."
            />
            <FAQ
              q="Is multi-currency supported?"
              a="MVP is USD only. Multi-currency is on the roadmap."
            />
            <FAQ
              q="Can I export CSV?"
              a="Not in MVP. Planned as a future enhancement."
            />
            <FAQ
              q="What stack is this?"
              a="Laravel 12, Inertia, React, Tailwind, MySQL, Recharts, deployed to AWS Lightsail."
            />
          </dl>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} Expense Tracker. Built by Kai.</p>
          <div className="flex items-center gap-4">
            {/* <a href="/privacy" className="hover:text-gray-700">
              Privacy
            </a>
            <a href="/terms" className="hover:text-gray-700">
              Terms
            </a> */}
            <a
              href="https://github.com/grkaym/ExpenseTracker"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-gray-700"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, children }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gray-50">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{children}</p>
        </div>
      </div>
    </div>
  );
}

function ScreenCard({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="mb-3">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
        {children}
      </div>
    </div>
  );
}

function FAQ({ q, a }) {
  return (
    <div className="px-5 py-4">
      <dt className="font-medium">{q}</dt>
      <dd className="mt-1 text-sm text-gray-600">{a}</dd>
    </div>
  );
}
