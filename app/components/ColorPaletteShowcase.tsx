import React from 'react';

export function ColorPaletteShowcase() {
  const colors = [
    { name: 'Primary', class: 'bg-primary', hex: '#6699A1' },
    { name: 'Secondary', class: 'bg-secondary', hex: '#C17C74' },
    { name: 'Background', class: 'bg-background', hex: '#FAF9F7' },
    { name: 'Background Dark', class: 'bg-backgroundDark', hex: '#E8E6E1' },
    { name: 'Text', class: 'bg-text', hex: '#3B3A30' },
    { name: 'Text Secondary', class: 'bg-textSecondary', hex: '#7C7C72' },
    { name: 'Positive', class: 'bg-positive', hex: '#9EB89D' },
    { name: 'Warning', class: 'bg-warning', hex: '#D97C7C' },
    { name: 'Neutral', class: 'bg-neutral', hex: '#D9CBB2' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Custom Color Palette</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {colors.map((color) => (
          <div key={color.name} className="rounded-lg overflow-hidden shadow-md">
            <div className={`${color.class} h-24 w-full`}></div>
            <div className="p-4 bg-backgroundDark">
              <h3 className="font-medium text-text">{color.name}</h3>
              <p className="text-textSecondary text-sm">{color.hex}</p>
              <p className="text-textSecondary text-sm mt-1">{color.class}</p>
            </div>
          </div>
        ))}
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 text-primary">Text Examples</h2>
      <div className="space-y-4">
        <p className="text-primary">This text is in primary color</p>
        <p className="text-secondary">This text is in secondary color</p>
        <p className="text-text">This is the default text color</p>
        <p className="text-textSecondary">This is the secondary text color</p>
        <p className="text-positive">This text is in positive color</p>
        <p className="text-warning">This text is in warning color</p>
        <p className="text-neutral">This text is in neutral color</p>
        <p className="text-gradient font-bold text-2xl">This text has a gradient from primary to secondary</p>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 text-primary">Button Examples</h2>
      <div className="flex flex-wrap gap-4">
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90">
          Primary Button
        </button>
        <button className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-90">
          Secondary Button
        </button>
        <button className="bg-positive text-white px-4 py-2 rounded-md hover:bg-opacity-90">
          Positive Button
        </button>
        <button className="bg-warning text-white px-4 py-2 rounded-md hover:bg-opacity-90">
          Warning Button
        </button>
        <button className="bg-neutral text-text px-4 py-2 rounded-md hover:bg-opacity-90">
          Neutral Button
        </button>
        <button className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary hover:bg-opacity-10">
          Outlined Button
        </button>
      </div>
    </div>
  );
}
