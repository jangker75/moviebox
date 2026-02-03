import { API_BASE_URL_DETAIL, API_ENDPOINTS } from "@/lib/constants";
import { promises as fs } from "fs";
import path from "path";

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
    // Check if local file exists
    // Use cache folder in root directory (not in src/)
    const detailsDir = path.join(process.cwd(), 'cache', 'details');
    const localFilePath = path.join(detailsDir, `${bookId}.json`);
    
    try {
      await fs.access(localFilePath);
      const fileContents = await fs.readFile(localFilePath, 'utf8');
      const localData = JSON.parse(fileContents);
      console.log(`Loaded complete data for bookId ${bookId} from local cache`);
      
      return Response.json({
        success: true,
        data: localData
      });
    } catch (fileError) {
      // File doesn't exist, fetch from API
      console.log(`No local cache for bookId ${bookId}, fetching from APIs`);
    }

    // Fetch from external APIs
    const [detailResponse] = await Promise.all([
      fetch(`${API_BASE_URL_DETAIL}${API_ENDPOINTS.DETAIL}?bookId=${bookId}`, {
        cache: 'no-store',
      })
    ]);

    const detailResult = await detailResponse.json();

    if (detailResult.success && detailResult.data) {
      const responseData = {
        bookName: detailResult.data.bookName,
        coverWap: detailResult.data.coverWap,
        introduction: detailResult.data.introduction,
        list: [],
        ratingConf: {
          showRate: false,
          rate: '0',
          ratingCount: '0'
        }
      };

      // Save to local cache for future use (local caching)
      try {
        // Ensure details directory exists
        await fs.mkdir(detailsDir, { recursive: true });
        await fs.writeFile(localFilePath, JSON.stringify(responseData, null, 2), 'utf8');
        console.log(`Saved drama detail for bookId ${bookId} to local cache`);
      } catch (saveError) {
        console.error(`Failed to save drama detail for bookId ${bookId}:`, saveError);
        // Continue even if save fails - important for read-only filesystems
      }

      return Response.json({
        success: true,
        data: responseData
      });
    }

    return Response.json(
      { success: false, error: 'Failed to fetch drama details' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error fetching drama detail:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch drama details' },
      { status: 500 }
    );
  }
}
