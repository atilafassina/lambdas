# Fetch from Youtube/search

## Environment Variables

| Variable        | Required | Description                                                                     |
| --------------- | -------- | ------------------------------------------------------------------------------- |
| `YOUTUBE_TOKEN` | Yes      | Provided by Google Services when request access to youtube api                  |
| `CHANNEL_ID`    | No       | The `id` of channel to fetch from, can be received in the request as a fallback |

## Request Parameters

| Parameter    | Default | Description                                   |
| ------------ | ------- | --------------------------------------------- |
| `order`      | `date`  | criteria which will be used to order items    |
| `maxResults` | `6`     | the maximum number of results in the response |

Check Youtube V3 docs for the [options](https://developers.google.com/youtube/v3/docs/search/list) on these parameters.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/atilafassina/lambda/tree/main/packages/youtube-videos)