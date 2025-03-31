import { google } from 'googleapis';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '@/utils/authOptions';

export async function GET(req) {
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

    // Get the file ID
    const fileId = url.searchParams.get('fileId');

    // Check the file ID
    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    // Get the file from Google Drive
    const fileResponse = await drive.files.get(
      {
        fileId,
        alt: 'media',
      },
      { responseType: 'stream' }
    );

    // Get the file stream
    const fileStream = fileResponse.data;

    // Set a default file name
    let fileName = 'downloaded-file';

    // Get the 'Content-Disposition' header to determine the file's name
    const contentDisposition = fileResponse.headers['content-disposition'];

    // Extract the file name
    if (contentDisposition) {
      const matches = contentDisposition.match(/filename="(.+)"/);
      if (matches && matches[1]) {
        fileName = matches[1];
      }
    }

    // Return the file stream
    return new NextResponse(fileStream, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
}
