import React from 'react';
import { SelectionOptionCard } from '../ui/SelectionOptionCard';

interface Item {
  model: string;
  brand: string;
  features?: string;
  display_resolution?: string;
  display_type?: string;
  refresh_rate?: string;
  connectivity?: string;
  compatibility?: string;
  number_keys?: number;
  button_quantity?: number;
  recommended: boolean;
}

interface SelectionStepProps {
  title: string;
  items: Item[];
  selectedItem: string | null;
  onSelectItem: (model: string) => void;
  radioName: string;
}

function getItemSpecs(item: Item): string {
  if (item.features) return item.features;
  if (item.display_resolution) return `${item.display_resolution} ${item.display_type}, ${item.refresh_rate}Hz`;
  if (item.connectivity && item.number_keys) return `${item.connectivity} • ${item.compatibility} • ${item.number_keys} keys`;
  if (item.connectivity && item.button_quantity) return `${item.connectivity} • ${item.compatibility} • ${item.button_quantity} buttons`;
  return '';
}

export function SelectionStep({ title, items, selectedItem, onSelectItem, radioName }: SelectionStepProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl text-gray-900 font-medium mb-4">{title}</h2>
      <div className="flex flex-col gap-2">
        {items.map((item, idx) => (
          <SelectionOptionCard
            key={item.model}
            title={`${item.brand} ${item.model}`}
            specs={getItemSpecs(item)}
            eligible={true}
            recommended={item.recommended}
            selected={selectedItem === item.model}
            onSelect={() => onSelectItem(item.model)}
            radioName={radioName}
          />
        ))}
      </div>
    </div>
  );
} 