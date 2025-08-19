import Section from '../components/common/Section';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const stats = [
  { label: 'Visitors', value: 245e3 },
  { label: 'Regular customers', value: 35e3 },
  { label: 'Turnover ($)', value: 1.2e6 },
  { label: 'Reviews', value: 12e3 },
];

const seasonData = [
  { name: 'Winter', sales: 4000 },
  { name: 'Spring', sales: 8000 },
  { name: 'Summer', sales: 12000 },
  { name: 'Autumn', sales: 6000 },
];

const categories = [
  { name: 'Accessories', value: 300 },
  { name: 'Clothing', value: 500 },
  { name: 'Eco-products', value: 200 },
  { name: 'Home goods', value: 400 },
];

const COLORS = ['#facc15', '#f97316', '#22c55e', '#3b82f6'];

export default function StatisticsPage() {
  return (
    <div className="page">
      <Section title="Our Statistics">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3>General Info</h3>
            <ul className="space-y-2 mt-2">
              {stats.map((s) => (
                <li key={s.label} className="flex justify-between">
                  <span>{s.label}</span>
                  <span className="font-medium">{s.value.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3>Best Seasons</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={seasonData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#facc15" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border lg:col-span-2">
            <h3>Top Rated Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categories} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                  {categories.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>
    </div>
  );
}
