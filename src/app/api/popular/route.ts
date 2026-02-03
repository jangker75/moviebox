import { API_BASE_URL, API_ENDPOINTS } from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'trending';

  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.POPULAR}?type=${type}`,
      {
        cache: 'no-store',
      }
    );

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching popular dramas:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch popular dramas' },
      { status: 500 }
    );
  }
}
