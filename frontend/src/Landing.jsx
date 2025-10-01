import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-xl">SparkBoard</div>
        <nav className="text-sm">
          <a href="#features" className="mr-4 hover:underline">
            Features
          </a>
          <Link to="/app" className="px-3 py-1 rounded bg-blue-600 text-white">
            Open App
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="px-6 py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Capture ideas. Upvote brilliance.
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                SparkBoard is the simplest way to collect lightweight ideas and
                surface the ones your team loves. No logins, no noise—just
                momentum.
              </p>
              <div className="mt-6">
                <Link
                  to="/app"
                  className="inline-block px-6 py-3 rounded bg-blue-600 text-white text-base md:text-lg shadow hover:bg-blue-700"
                >
                  Get started
                </Link>
              </div>
            </div>
            <div className="md:pl-8">
              <div className="aspect-video rounded-xl border shadow bg-white p-6">
                <div className="h-full w-full flex items-center justify-center text-gray-500">
                  Live idea board demo
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Why SparkBoard</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Feature
                title="Frictionless input"
                desc="Drop an idea in seconds. 280 characters to keep it sharp and focused."
              />
              <Feature
                title="Instant signal"
                desc="Upvotes reveal what resonates. No long threads. No meetings required."
              />
              <Feature
                title="Always fresh"
                desc="Lightweight refresh keeps your board live without complex real‑time setup."
              />
              <Feature
                title="Portable"
                desc="Runs anywhere with Docker. Launch locally, ship to the cloud when ready."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SparkBoard. Built for fast feedback.
      </footer>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5">
      <div className="text-lg font-semibold">{title}</div>
      <p className="mt-2 text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}
