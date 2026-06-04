import type { WorkCategory } from '../../data/schema'
import { categoryLabels } from '../../data/schema'

interface CategoryFilterProps {
  activeCategory: WorkCategory | 'all'
  onSelect: (category: WorkCategory | 'all') => void
}

const FILTER_ITEMS: { key: WorkCategory | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'video', label: categoryLabels.video },
  { key: 'dev', label: categoryLabels.dev },
  { key: 'motion', label: categoryLabels.motion },
]

export function CategoryFilter({ activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-12">
      {FILTER_ITEMS.map((item) => (
        <button
          key={item.key}
          onClick={() => onSelect(item.key)}
          className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
            activeCategory === item.key
              ? 'bg-primary dark:bg-white text-white dark:text-primary shadow-sm'
              : 'text-muted hover:text-primary dark:hover:text-white bg-surface-alt dark:bg-neutral-800 border border-border dark:border-neutral-700'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
