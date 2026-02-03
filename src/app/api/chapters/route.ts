import { API_BASE_URL_CHAPTERS, API_BASE_URL_CHAPTERS_2, API_ENDPOINTS } from "@/lib/constants";
import path from "path";
import { promises as fs } from "fs";

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
    // Check if local file exists for this bookId
    // Use cache folder in root directory (not in src/)
    const chaptersDir = path.join(process.cwd(), 'cache', 'chapters');
    const filePath = path.join(chaptersDir, `${bookId}.json`);
    
    try {
      await fs.access(filePath);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContents);
      console.log(`Loaded chapters for bookId ${bookId} from local cache`);
      return Response.json(data);
    } catch (fileError) {
      // File doesn't exist, continue to fetch from API
      console.log(`No local cache for bookId ${bookId}, fetching from API`);
    }

    // Fetch from API
    const response = await fetch(
      `${API_BASE_URL_CHAPTERS_2}${API_ENDPOINTS.CHAPTERS}?bookId=${bookId}`,
      {
        cache: 'no-store',
      }
    );

    const data = await response.json();
    
    // Save to local cache for future use (local caching)
    try {
      // Ensure chapters directory exists
      await fs.mkdir(chaptersDir, { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Saved chapters for bookId ${bookId} to local cache`);
    } catch (saveError) {
      console.error(`Failed to save chapters for bookId ${bookId}:`, saveError);
      // Continue even if save fails - important for read-only filesystems
    }
    
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch chapters' },
      { status: 500 }
    );
  }
}
