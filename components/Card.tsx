'use client';

interface CardProps {
  value: string;
  isSelected: boolean;
  isRevealed: boolean;
  backValue?: string;
  onClick: () => void;
}

export function Card({ value, isSelected, isRevealed, backValue, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        w-36 h-52 flex items-center justify-center px-2 font-bold
        rounded-lg cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-4 ring-blue-500 bg-blue-50' : 'bg-white hover:bg-gray-50'}
        ${isRevealed ? 'bg-gray-100' : ''}
        shadow-lg
      `}
    >
      <span className={`
        ${value.length > 2 ? 'text-2xl' : 'text-4xl'}
        text-center
      `}>
        {isRevealed && backValue ? backValue : value}
      </span>
    </div>
  );
}
