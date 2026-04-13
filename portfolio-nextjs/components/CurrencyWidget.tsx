'use client';

import { useEffect, useState } from 'react';
import { CURRENCY_API_URL } from '@/lib/constants';
import type { CurrencyAPIResponse } from '@/lib/types';

interface CurrencyDisplay {
  code: string;
  bid: string;
  varBid: number;
}

export default function CurrencyWidget() {
  const [currencies, setCurrencies] = useState<CurrencyDisplay[] | null>(null);

  useEffect(() => {
    async function fetchCurrency() {
      try {
        const res = await fetch(CURRENCY_API_URL);
        if (!res.ok) return;
        const data: CurrencyAPIResponse = await res.json();
        setCurrencies([
          {
            code: 'USD',
            bid: `R$ ${parseFloat(data.USDBRL.bid).toFixed(2)}`,
            varBid: parseFloat(data.USDBRL.varBid),
          },
          {
            code: 'EUR',
            bid: `R$ ${parseFloat(data.EURBRL.bid).toFixed(2)}`,
            varBid: parseFloat(data.EURBRL.varBid),
          },
        ]);
      } catch {
        // Hide widget on error
      }
    }
    fetchCurrency();
  }, []);

  if (!currencies) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-text-secondary" aria-label="currency-widget">
      {currencies.map((c) => (
        <span key={c.code} className="flex items-center gap-0.5">
          <span className="text-text-muted">{c.code}</span>
          <span>{c.bid}</span>
          {c.varBid > 0 ? (
            <span className="text-green-500">▲</span>
          ) : c.varBid < 0 ? (
            <span className="text-red-500">▼</span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
