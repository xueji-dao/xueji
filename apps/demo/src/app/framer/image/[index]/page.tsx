import { images } from '../../constants'
import SingleImage from './SingleImage'

interface ParamsType {
  params: { index: string }
}

const Page = async ({ params }: ParamsType) => {
  const { index } = await params
  const index1 = Number.parseInt(index, 10)
  return <SingleImage index={index1} />
}

export async function generateStaticParams() {
  return images.map((_id, index) => {
    return {
      index: `${index}`,
    }
  })
}

export default Page
