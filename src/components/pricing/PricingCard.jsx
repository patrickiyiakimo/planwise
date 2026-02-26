"use client";

import React from 'react';
import { Check, X, Sparkles, Award } from 'lucide-react';

const PricingCard = ({
  plan,
  billingCycle,
  isVisible,
  index,
  onSelect
}) => {
  const getPrice = () => {
    if (plan.isFree) return 'Free';
    return `${plan.currency}${plan.price[billingCycle].toLocaleString()}`;
  };

  return (
    <div
      className={`
        group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        ${plan.isPopular ? 'lg:-mt-4 lg:mb-4 ring-2 ring-indigo-600' : ''}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-full shadow-lg">
            <Award className="w-4 h-4" />
            <span className="text-sm font-semibold">Most Popular</span>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-8">
        {/* Plan Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <p className="text-sm text-gray-500 mb-4">{plan.tagline}</p>
          
          {/* Price */}
          <div className="flex items-center justify-center">
            {!plan.isFree && (
              <span className="text-2xl font-semibold text-gray-500 align-top">
                {plan.currency}
              </span>
            )}
            <span className="text-5xl font-bold text-gray-900 mx-1">
              {getPrice()}
            </span>
            {!plan.isFree && (
              <span className="text-gray-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
            )}
          </div>
          
          {/* Annual Savings Note */}
          {billingCycle === 'annual' && !plan.isFree && (
            <p className="text-sm text-green-600 mt-2">
              Save 17% with annual billing
            </p>
          )}
        </div>

        {/* Features List */}
        <div className="space-y-4 mb-8">
          {plan.features.map((feature, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              {feature.included ? (
                <Check className={`w-5 h-5 flex-shrink-0 ${feature.highlight ? 'text-indigo-600' : 'text-green-500'}`} />
              ) : (
                <X className="w-5 h-5 flex-shrink-0 text-gray-300" />
              )}
              <span className={`text-sm ${feature.included ? 'text-gray-600' : 'text-gray-400'}`}>
                {feature.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onSelect(plan.id)}
          className={`
            w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200
            ${plan.isPopular
              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : plan.isFree
                ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-indigo-600 hover:text-indigo-600'
            }
          `}
        >
          {plan.cta}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;