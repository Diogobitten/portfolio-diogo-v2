import { NextResponse } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'Rio de Janeiro';
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=pt_br`
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: CORS_HEADERS,
    });
  } catch (error) {
    console.error('Erro ao conectar à API do OpenWeather:', error);
    return NextResponse.json(
      { error: 'Erro ao conectar à API do OpenWeather' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
