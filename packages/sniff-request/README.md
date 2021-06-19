# Sniff 🐶

Get location and browser from a request

## Deploy 📡

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/atilafassina/lambda/tree/main/packages/sniff-request)

## Response types 👷‍♀️

```ts
type Response = {
  ua: string
  browser: {
    name?: string
    version: string
    major: string
  }
  engine: {
    name?: string
    version: string
  }
  os: {
    name?: string
    version: string
  }
  device?: {
    model?: string
    type?: string
    vendor?: string
  }
  continent?: {
    code: string
    name: string
  }
  country?: {
    code: string
    name?: string
    isEuropeanUnion: boolean
  }
  subdivision?: {
    name: string
  }
  city?: {
    name?: string
  }
  location?: {
    latitude: number
    longitude: number
  }
}
```

## Thanks 🙇

- [UAParser.js](https://faisalman.github.io/ua-parser-js/)
- [IP-Geolocation](https://github.com/devoxa/ip-geolocation)

## License special terms ⚠️

This serverless function has a transitive dependency to [db-ip.com](https://db-ip.com). According to their [license](https://github.com/devoxa/ip-geolocation#license), whenever using their database, a page which displays the result must refer back a link to them. Please be mindful if you intend to use it.
