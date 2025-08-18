import { useId } from 'react';

export type FiltersState = {
  q: string;
  topic: 'All' | 'Food' | 'Toys' | 'Clothes' | 'Other';
  maxPrice: number;
  tags: string[];
  sort: 'none' | 'price-asc' | 'price-desc';
};

type FiltersProps = {
  value: FiltersState;
  onChange: (v: FiltersState) => void;
  priceMaxAbs: number;
  topics?: string[];
  availableTags?: string[];
  showSort?: boolean;
};

export default function Filters({
  value,
  onChange,
  priceMaxAbs,
  topics = ['All'],
  availableTags = [],
  showSort = true,
}: FiltersProps) {
  const idSearch = useId();
  const idRange = useId();
  const idSort = useId();

  const toggleTag = (tag: string) => {
    const exists = value.tags.includes(tag);
    const tags = exists ? value.tags.filter((t) => t !== tag) : [...value.tags, tag];
    onChange({ ...value, tags });
  };

  return (
    <aside className="border rounded p-4 space-y-5">
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
        <div>
          <h3 className="font-semibold mb-2">Topic</h3>
          <div className="flex gap-2 flex-wrap">
            {topics.map((t) => (
              <button
                key={t}
                type="button"
                className={`border px-3 py-1.5 rounded ${
                  value.topic === t || (!value.topic && t === 'All') ? 'bg-black text-white' : ''
                }`}
                onClick={() => onChange({ ...value, topic: t })}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
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

      {availableTags.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const active = value.tags.includes(tag);
              return (
                <label
                  key={tag}
                  className={`cursor-pointer select-none border rounded px-3 py-1.5 text-sm ${
                    active ? 'bg-black text-white' : ''
                  }`}
                >
                  <input type="checkbox" className="sr-only" checked={active} onChange={() => toggleTag(tag)} />
                  {tag}
                </label>
              );
            })}
          </div>
        </div>
      )}

      {showSort && (
        <div>
          <label htmlFor={idSort} className="block text-sm font-medium">
            Sort by
          </label>
          <select
            id={idSort}
            className="mt-1 w-full border rounded px-3 py-2 bg-white"
            value={value.sort}
            onChange={(e) => onChange({ ...value, sort: e.target.value as FiltersState['sort'] })}
          >
            <option value="none">None</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      )}
    </aside>
  );
}
