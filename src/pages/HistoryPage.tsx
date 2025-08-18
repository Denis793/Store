import Section from '../components/common/Section';

const timeline = [
  { year: '2019', text: 'Launched first pet accessories line.' },
  { year: '2021', text: 'Expanded to eco-friendly products.' },
  { year: '2023', text: 'Reached 100k happy customers.' },
];

export default function HistoryPage() {
  return (
    <Section title="Our History">
      <ol className="relative border-s pl-6">
        {timeline.map((t) => (
          <li key={t.year} className="mb-8 ms-6">
            <span className="absolute -left-3 mt-1 h-3 w-3 rounded-full bg-black"></span>
            <h4 className="font-semibold">{t.year}</h4>
            <p className="text-gray-600">{t.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
