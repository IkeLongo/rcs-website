import { NextResponse } from 'next/server';
import { getOverviewStats, getPageViews } from '@/lib/analytics-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'overview';

  try {
    let data;
    
    switch (type) {
      case 'overview':
        data = await getOverviewStats();
        break;
      case 'pages':
        data = await getPageViews();
        break;
      default:
        data = await getOverviewStats();
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}