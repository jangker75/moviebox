import { API_BASE_URL_DETAIL, API_ENDPOINTS } from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get('bookId');

  if (!bookId) {
    return Response.json(
      { success: false, error: 'bookId is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${API_BASE_URL_DETAIL}${API_ENDPOINTS.DETAIL}?bookId=${bookId}`,
      {
        cache: 'no-store',
      }
    );

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching drama detail:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch drama detail' },
      { status: 500 }
    );
  }
}
