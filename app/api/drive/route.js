import { google } from 'googleapis';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '@/utils/authOptions';
import { Readable } from 'stream';

export async function GET() {
  // Get the user's session
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated and has a valid access token
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Initialize Google OAuth2 authentication
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });

  // Create a Google Drive instance
  const drive = google.drive({ version: 'v3', auth });

  try {
    // Fetch a list of files from Google Drive
    const response = await drive.files.list({
      pageSize: 10,
      fields: 'files(id, name, mimeType, createdTime, modifiedTime)',
      orderBy: 'modifiedTime desc',
    });

    // Return the files as a JSON
    return NextResponse.json(response.data.files);
  } catch (error) {
    // Handle and return found errors
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });

  const drive = google.drive({ version: 'v3', auth });

  try {
    // Parse the URL
    const url = new URL(req.url);

    // Get the file ID from the parameters
    const fileId = url.searchParams.get('fileId');
    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    // Call the Google Drive API to delete the file
    await drive.files.delete({
      fileId,
    });
    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    // Handle and return found errors
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });

  const drive = google.drive({ version: 'v3', auth });

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Check if the file is valid
    if (file instanceof Blob) {
      // Set the file name
      const fileName = file.name || 'untitled';

      // Convert the file to a readable stream
      const stream = Readable.from(file.stream());

      // Upload the file to Google Drive
      const response = await drive.files.create({
        requestBody: {
          name: fileName,
          mimeType: file.type,
        },
        media: {
          mimeType: file.type,
          body: stream,
        },
      });

      // Return a success response with the file ID
      return NextResponse.json({
        message: 'File uploaded successfully',
        fileId: response.data.id,
      });
    } else {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }
  } catch (error) {
    // Handle and return found errors
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
