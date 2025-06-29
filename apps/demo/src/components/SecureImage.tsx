import Image, { ImageProps } from 'next/image'

export function SecureImage(props: ImageProps) {
  const src = typeof props.src === 'string' ? `/api/image${props.src}` : props.src
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} src={src} />
}
