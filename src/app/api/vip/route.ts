import { API_BASE_URL, API_ENDPOINTS } from "@/lib/constants";

export async function GET() {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.POPULAR}?type=vip`,
      {
        cache: 'no-store',
      }
    );

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching VIP dramas:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch VIP dramas' },
      { status: 500 }
    );
  }
}
