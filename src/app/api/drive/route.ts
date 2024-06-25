import { google } from 'googleapis'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({message: "User not found"})
  }

  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(userId,"oauth_google")
  const accessToken = clerkResponse.data[0].token

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.OAUTH2_REDIRECT_URI
  )
  oauth2Client.setCredentials({access_token: accessToken})

  const drive = google.drive({version: 'v3', auth: oauth2Client})
  
  try {
    const response = await drive.files.list()

    if (response) {
      return Response.json({message: response.data}, {status: 200})
    } else {
      return Response.json({message: 'No files found'}, {status: 200})
    }
  } catch (error) {
    return Response.json({message: 'Something went wrong'}, {status: 500})
  }
}