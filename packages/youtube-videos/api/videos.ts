import type { NowRequest, NowResponse } from '@vercel/node'
import fetch from 'node-fetch'

const TOKEN = process.env.YOUTUBE_TOKEN
const CHANNEL = process.env.CHANNEL_ID
const ENDPOINT = (channel: string) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel}&key=${TOKEN}&type=video&order=date&maxResults=6`
const HOUR_IN_SECONDS = 60 * 60

const fetchVideos = async (url: string) => {
  const resp = await fetch(url)
  const data = await resp.json()

  if (data.error) {
    return {
      status: data.error.code,
      data: {
        message: data.error.message,
        statusCode: data.error.code,
      },
    }
  }

  return data.items
}

export default async (req: NowRequest, res: NowResponse) => {
  const channelId =
    typeof req.query.channel === 'string' ? req.query.channel : CHANNEL as string

  res.setHeader('Content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Cache-Control',
    `s-maxage=${6 * HOUR_IN_SECONDS}, stale-while-revalidate`
  )

  const videos = await fetchVideos(ENDPOINT(channelId))
  res.status(200).send(JSON.stringify(videos))
}
