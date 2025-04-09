import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Handle GET requests to fetch images
export async function GET(request: Request) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get("page") || "1";
    const limitParam = searchParams.get("limit") || "12";
    const searchQuery = searchParams.get("search") || "";

    // Convert page and limit to numbers
    const page = parseInt(pageParam);
    const limit = parseInt(limitParam);

    // Calculate how many items to skip for pagination
    const skip = (page - 1) * limit;

    // Connect to the 'images' collection in MongoDB
    const imagesCollection = dbConnect("images");

    // Create a filter for search functionality
    const filter = searchQuery
      ? {
          $or: [
            { title: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search in title
          ],
        }
      : {};

    // Fetch filtered and paginated images, sorted by most recent
    const images = await imagesCollection
      .find(filter)
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit)
      .toArray();

    // Count total matching documents for pagination
    const totalImages = await imagesCollection.countDocuments(filter);

    // Check if there are more images available beyond the current page
    const hasMore = totalImages > skip + images.length;

    // Return the response with data
    return NextResponse.json({
      images,
      total: totalImages,
      page,
      limit,
      hasMore,
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

// Handle POST requests to upload a new image
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, url, thumbnail } = data;

    // Check for required fields
    if (!title || !url || !thumbnail) {
      return NextResponse.json(
        { error: "Title, URL, and thumbnail are required" },
        { status: 400 }
      );
    }

    // Connect to the 'images' collection
    const imagesCollection = dbConnect("images");

    // Prepare the new image document
    const newImage = {
      title,
      url,
      thumbnail,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert the new image into the database
    const result = await imagesCollection.insertOne(newImage);

    // Return the inserted image with its new ID
    return NextResponse.json(
      {
        _id: result.insertedId,
        ...newImage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating image:", error);
    return NextResponse.json(
      { error: "Failed to create image" },
      { status: 500 }
    );
  }
}
