import { NextResponse } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET() {
  try {
    const response = await fetch(
      'https://api.github.com/users/Diogobitten/repos?sort=updated&per_page=100',
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Erro ao conectar à API do GitHub:', error);
    return NextResponse.json(
      { error: 'Erro ao conectar à API do GitHub' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
