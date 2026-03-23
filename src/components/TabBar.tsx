'use client';

import { Tab } from '@toss/tds-mobile';
import { Category } from '@/types/event';
import { getCategoryLabel } from '@/utils/filters';

interface TabBarProps {
  activeTab: Category;
  onTabChange: (tab: Category) => void;
}

const TABS: Category[] = ['rotation', 'bar', 'party'];

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const activeIndex = TABS.indexOf(activeTab);

  return (
    <Tab
      onChange={(index) => onTabChange(TABS[index])}
      ariaLabel="이벤트 카테고리"
    >
      {TABS.map((tab, index) => (
        <Tab.Item key={tab} selected={activeIndex === index}>
          {getCategoryLabel(tab)}
        </Tab.Item>
      ))}
    </Tab>
  );
}
