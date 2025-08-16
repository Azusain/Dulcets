import React from 'react';
import { cn } from '@/lib/utils';

export interface PricingCardProps {
  title: string;
  subtitle?: string;
  price?: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  borderHoverColor: string;
  priceItems?: Array<{
    label: string;
    price: string;
    priceColor?: string;
  }>;
  className?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  subtitle,
  price,
  description,
  icon,
  iconColor,
  borderHoverColor,
  priceItems = [],
  className
}) => {
  return (
    <div className={cn(
      "group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100",
      borderHoverColor,
      className
    )}>
      <div className="text-center">
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300",
          iconColor
        )}>
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        {subtitle && (
          <p className="text-gray-600 mb-6 leading-relaxed">
            {subtitle}
          </p>
        )}
        
        {price && (
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">{price}</span>
          </div>
        )}
        
        {description && (
          <p className="text-gray-600 mb-6 leading-relaxed">
            {description}
          </p>
        )}
        
        {priceItems.length > 0 && (
          <div className="space-y-3 text-left">
            {priceItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{item.label}</span>
                <span className={cn(
                  "font-semibold",
                  item.priceColor || "text-gray-900"
                )}>
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingCard;
