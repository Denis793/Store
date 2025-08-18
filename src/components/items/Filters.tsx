import { useId } from 'react';

export type FiltersState = { q: string; topic?: string; maxPrice: number };

type Props = {
  value: FiltersState;
  onChange: (next: FiltersState) => void;
  priceMaxAbs: number;
  topics?: string[];
};

export default function Filters({ value, onChange, priceMaxAbs, topics = ['All'] }: Props) {
  const idSearch = useId();
  const idRange = useId();

  return (
    <aside className="border rounded p-4">
      <div>
        <label htmlFor={idSearch} className="block text-sm font-medium">
          Search
        </label>
        <input
          id={idSearch}
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="Search by name"
          value={value.q}
          onChange={(e) => onChange({ ...value, q: e.target.value })}
        />
      </div>

      {topics.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Topic</h3>
          <div className="flex gap-2 flex-wrap">
            {topics.map((t) => (
              <button
                key={t}
                className={`border px-3 py-1.5 rounded ${
                  value.topic === t || (!value.topic && t === 'All') ? 'bg-black text-white' : ''
                }`}
                onClick={() => onChange({ ...value, topic: t })}
                type="button"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <label htmlFor={idRange} className="block text-sm font-medium">
          Max price: <b>${value.maxPrice}</b>
        </label>
        <input
          id={idRange}
          className="w-full"
          type="range"
          min={0}
          max={priceMaxAbs}
          value={value.maxPrice}
          step={1}
          onChange={(e) => onChange({ ...value, maxPrice: Number(e.target.value) })}
        />
      </div>
    </aside>
  );
}
