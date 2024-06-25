import { getBaseUrl } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const baseUrl = getBaseUrl()

  const code = req.nextUrl.searchParams.get('code')
  if (!code) {
    return new NextResponse("Code not provided", { status: 400 })
  }

  try {
    const response = await fetch(
      "https://slack.com/api/oauth.v2.access",
      {
        method: 'POST',
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({code, client_id: process.env.SLACK_CLIENT_ID!, client_secret: process.env.SLACK_CLIENT_SECRET!, redirect_uri: `${baseUrl}${process.env.SLACK_REDIRECT_URI}`})
      }
    )

    const data = await response.json()
    if (!data.ok) {
      throw new Error(data.error || 'Slack OAuth failed')
    } else {
      const appId = data?.app_id
      const userId = data?.authed_user?.id
      const userToken = data?.authed_user?.access_token
      const accessToken = data?.access_token
      const botUserId = data?.bot_user_id
      const teamId = data?.team?.id
      const teamName = data?.team?.name

      return NextResponse.redirect(
        `${baseUrl}/connections?app_id=${appId}&authed_user_id=${userId}&authed_user_token=${userToken}&slack_access_token=${accessToken}&bot_user_id=${botUserId}&team_id=${teamId}&team_name=${teamName}`
      )
    }
  
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}