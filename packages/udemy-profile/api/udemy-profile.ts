import { NowRequest, NowResponse } from '@vercel/node'
import cheerio from 'cheerio'

const QUARTER_DAY = 2150

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const udemyPage = await fetch(`https://www.udemy.com/user/${process.env.USER}/`)
    const domString = await udemyPage.text()
    const root = cheerio.load(domString)

    const totalStudentsSection = root('.instructor-profile--stat--136jc').html() as string
    const studentsWrapper = cheerio.load(totalStudentsSection)
    const students = Number(
      studentsWrapper('.udlite-heading-xl').text().replace(',', '')
    )


    const totalReviewsSection = root('.instructor-profile--stat--136jc')
      .next()
      .html() as string
    const reviewsWrapper = cheerio.load(totalReviewsSection)
    const reviews = Number(
      reviewsWrapper('.udlite-heading-xl').text().replace(',', '')
    )

    res.setHeader('Cache-Control', `s-maxage=${QUARTER_DAY}, stale-while-revalidate`)

    res.status(200).json({
      students,
      reviews,
    })
  } catch (error) {
    res.send({
      error,
    })
  }
}