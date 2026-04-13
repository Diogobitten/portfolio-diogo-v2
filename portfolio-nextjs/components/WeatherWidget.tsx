'use client';

import { useEffect, useState } from 'react';
import type { WeatherAPIResponse } from '@/lib/types';

interface WeatherData {
  temp: number;
  iconCode: string;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch('/api/weather?city=Rio+de+Janeiro');
        if (!res.ok) return;
        const data: WeatherAPIResponse = await res.json();
        if (data.cod !== 200 || !data.weather?.length) return;
        setWeather({
          temp: Math.round(data.main.temp),
          iconCode: data.weather[0].icon,
        });
      } catch {
        // Hide widget on error
      }
    }
    fetchWeather();
  }, []);

  if (!weather) return null;

  return (
    <div className="flex items-center gap-1 text-xs text-text-secondary" aria-label="weather-widget">
      <img
        src={`https://openweathermap.org/img/wn/${weather.iconCode}@2x.png`}
        alt="Clima"
        className="h-6 w-6"
      />
      <span>{weather.temp}°C</span>
      <span className="text-text-muted">Rio</span>
    </div>
  );
}
