import { API_BASE_URL, API_ENDPOINTS } from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return Response.json(
      { success: false, error: 'keyword is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.SEARCH}?keyword=${encodeURIComponent(keyword)}`,
      {
        cache: 'no-store',
      }
    );

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching search results:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch search results' },
      { status: 500 }
    );
  }
}
