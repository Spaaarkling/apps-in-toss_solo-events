'use client';

import { Category } from '@/types/event';
import { getCategoryLabel } from '@/utils/filters';

interface TabBarProps {
  activeTab: Category;
  onTabChange: (tab: Category) => void;
}

const TABS: Category[] = ['rotation', 'bar', 'party'];

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex gap-1 bg-[#1A1D23] rounded-xl p-1">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === tab
              ? 'bg-violet-600 text-white'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {getCategoryLabel(tab)}
        </button>
      ))}
    </div>
  );
}
