import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const owner = request.nextUrl.searchParams.get('owner');
  const repo = request.nextUrl.searchParams.get('repo');

  if (!owner || !repo) {
    return NextResponse.json({ error: 'Missing owner or repo' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Accept: 'application/vnd.github.v3.raw',
          Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      return NextResponse.json({ content: '' }, { status: 200 });
    }

    const content = await response.text();

    return NextResponse.json(
      { content },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    );
  } catch {
    return NextResponse.json({ content: '' }, { status: 200 });
  }
}
