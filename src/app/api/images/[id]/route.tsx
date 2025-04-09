import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Step 1: get the image ID from the route param
    const id = params.id;

    // Step 2: check if the ID is valid
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    // Step 3: Connect to the MongoDB 'images' collection
    const imagesCollection = dbConnect('images');

    // Step 4: Try to delete the image with the matching ID
    const result = await imagesCollection.deleteOne({
      _id: new ObjectId(id),
    });

    // Step 5: If no image was deleted, return a 404 error
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Step 6: If successful, return a success message
    return NextResponse.json({ success: true });
  } catch (error) {
    // Step 7: Catch any unexpected errors and return a 500 error
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
