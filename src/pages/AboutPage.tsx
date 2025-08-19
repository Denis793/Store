import {
  ArrowRightIcon,
  CheckBadgeIcon,
  GlobeAltIcon,
  HeartIcon,
  TruckIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="pb-16">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-white to-white" />
        <div className="container relative">
          <div className="py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm uppercase tracking-wider text-amber-700/80">About our store</p>
              <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
                From a small idea to a trusted marketplace
              </h1>
              <p className="mt-4 text-gray-600 max-w-prose">
                We started with a simple mission: make quality products accessible to everyone. Today, we’re a growing
                community of customers, partners, and makers moving retail forward.
              </p>
              <div className="mt-6 flex gap-3">
                <Link
                  to="/items"
                  className="inline-flex items-center gap-2 rounded-lg bg-black text-white px-4 py-2 hover:bg-gray-800 transition"
                >
                  Browse items <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  to="/history"
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50 transition"
                >
                  Our history
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl border bg-white shadow-lg p-6 md:p-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <Stat value="9+" label="Years" />
                  <Stat value="25k+" label="Customers" />
                  <Stat value="3.8k+" label="Products" />
                </div>
                <div className="mt-6 h-[1px] bg-gray-100" />
                <ul className="mt-6 space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckBadgeIcon className="w-5 h-5 text-amber-600" /> Quality-first curation
                  </li>
                  <li className="flex items-center gap-2">
                    <TruckIcon className="w-5 h-5 text-amber-600" /> Reliable delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5 text-amber-600" /> Community-driven support
                  </li>
                </ul>
              </div>
              <div className="absolute -z-10 -right-6 -bottom-6 w-40 h-40 rounded-3xl bg-amber-300/40 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <Card title="Our Story" icon={<HeartIcon className="w-6 h-6 text-amber-600" />}>
            Founded in 2015 as a small family shop, we grew by focusing on trustworthy products and warm customer care.
            From packing orders by hand to building a modern platform, we’ve kept the same promise: fair value, great
            experience.
          </Card>
          <Card title="Our Journey" icon={<GlobeAltIcon className="w-6 h-6 text-amber-600" />}>
            We scaled thoughtfully—expanding categories, refining logistics, and investing in a seamless online
            experience. Every release is shaped by feedback from real shoppers and creators.
          </Card>
          <Card title="Who We Serve" icon={<UsersIcon className="w-6 h-6 text-amber-600" />}>
            Students, professionals, and families looking for dependable quality at fair prices. If you value design,
            durability, and honest service—you’re our people.
          </Card>
        </div>
      </section>

      <section className="container mt-14">
        <h2 className="text-2xl font-bold">Milestones</h2>
        <div className="mt-6 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
          <TimelineItem year="2015" title="First orders shipped">
            We launched with a small curated catalog and personal support for every customer.
          </TimelineItem>
          <TimelineItem year="2018" title="Nationwide delivery">
            Partnered with reliable carriers to reach customers faster and safer.
          </TimelineItem>
          <TimelineItem year="2021" title="Marketplace expansion">
            Opened doors to selected makers and small brands; broadened categories.
          </TimelineItem>
          <TimelineItem year="2024" title="Customer community">
            Introduced reviews, favorites, and tailored recommendations.
          </TimelineItem>
        </div>
      </section>

      <section className="container mt-14">
        <div className="rounded-2xl border bg-gradient-to-br from-white to-amber-50 p-6 md:p-8">
          <h3 className="text-xl font-semibold">Our Values</h3>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <Value title="Honesty" desc="Transparent pricing and clear policies." />
            <Value title="Quality" desc="Carefully selected products and partners." />
            <Value title="Care" desc="Responsive support and easy returns." />
            <Value title="Impact" desc="Giving back through local initiatives." />
          </div>
        </div>
      </section>

      <section className="container mt-14">
        <div className="rounded-2xl bg-black text-white px-6 py-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold">Ready to explore?</h3>
            <p className="mt-1 text-white/80">Browse our latest arrivals and find your next favorite.</p>
          </div>
          <Link
            to="/items"
            className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 hover:bg-gray-100 transition"
          >
            Shop now <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Card({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-3 text-gray-600 leading-relaxed">{children}</p>
    </div>
  );
}

function TimelineItem({ year, title, children }: { year: string; title: string; children: React.ReactNode }) {
  return (
    <div className="pl-10 pb-8 relative">
      <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-amber-600" />
      <div className="text-xs text-amber-700/90 font-medium">{year}</div>
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-1 text-sm text-gray-600">{children}</div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function Value({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-white/60 p-4">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-gray-600">{desc}</div>
    </div>
  );
}
