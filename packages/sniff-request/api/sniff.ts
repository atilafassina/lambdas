import type { VercelRequest, VercelResponse } from '@vercel/node'
import { UAParser } from 'ua-parser-js'
import { geolocateIp } from '@devoxa/ip-geolocation'

const DAY_IN_SECONDS = 24 * 60 * 60

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Cache-Control',
    // only browser cache, for 1 day, don't take stale responses once max-age expires
    `private, s-maxage=${DAY_IN_SECONDS}, must-revalidate`
  )

  const location =
    typeof req.headers['x-forwarded-for'] === 'string' &&
    (await geolocateIp(req.headers['x-forwarded-for']))

  res.status(200).send({
    ...UAParser(req.headers['user-agent']),
    location,
    // country: req.headers['x-vercel-ip-country-region'], // Enterprise or Pro plan on Vercel
  })
}
