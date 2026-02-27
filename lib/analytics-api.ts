import { BetaAnalyticsDataClient } from '@google-analytics/data';

const propertyId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_PROPERTY_ID;

// Initialize client with Application Default Credentials
const analyticsDataClient = new BetaAnalyticsDataClient();

export async function getOverviewStats() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      metrics: [
        { name: 'totalUsers' },
        { name: 'sessions' },
        { name: 'pageviews' },
        { name: 'bounceRate' },
      ],
    });

    const row = response.rows?.[0];
    return {
      success: true,
      data: {
        totalUsers: row?.metricValues?.[0]?.value || '0',
        sessions: row?.metricValues?.[1]?.value || '0',
        pageviews: row?.metricValues?.[2]?.value || '0',
        bounceRate: row?.metricValues?.[3]?.value || '0',
      },
    };
  } catch (error) {
    console.error('Analytics API Error:', error);
    return {
      success: false,
      error: 'Failed to fetch analytics data',
    };
  }
}

export async function getPageViews() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        { name: 'pagePath' },
        { name: 'pageTitle' },
      ],
      metrics: [
        { name: 'pageviews' },
        { name: 'sessions' },
      ],
      orderBys: [
        {
          metric: {
            metricName: 'pageviews',
          },
          desc: true,
        },
      ],
      limit: 10,
    });

    return {
      success: true,
      data: response.rows?.map(row => ({
        pagePath: row.dimensionValues?.[0]?.value || '',
        pageTitle: row.dimensionValues?.[1]?.value || '',
        pageviews: row.metricValues?.[0]?.value || '0',
        sessions: row.metricValues?.[1]?.value || '0',
      })) || [],
    };
  } catch (error) {
    console.error('Page Views Error:', error);
    return {
      success: false,
      error: 'Failed to fetch page views data',
    };
  }
}