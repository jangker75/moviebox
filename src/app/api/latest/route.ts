import { API_BASE_URL } from "@/lib/constants";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const pageSize = '12'; // Always set to 12
    
    const response = await fetch(
      `${API_BASE_URL}/dubbed?page=${page}&pageSize=${pageSize}`,
      {
        cache: 'no-store',
      }
    );

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching dubbed dramas:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch dubbed dramas' },
      { status: 500 }
    );
  }
}
