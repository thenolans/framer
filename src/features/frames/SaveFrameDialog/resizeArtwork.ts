/** The longest side a picture is shrunk to: sharp at full width on a high-density screen. */
const MAX_SIDE = 2000
const JPEG_QUALITY = 0.85

/**
 * `file` as a JPEG at most `MAX_SIDE` on its longest side, so phone photos upload quickly. Rejects
 * when the browser can't read the file as an image.
 */
export async function resizeArtwork(file: File): Promise<File> {
  // Applies the photo's EXIF orientation, so phone photos come out upright.
  const image = await createImageBitmap(file)
  const scale = Math.min(1, MAX_SIDE / Math.max(image.width, image.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(image.width * scale)
  canvas.height = Math.round(image.height * scale)

  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is unavailable')
  // JPEG has no transparency: see-through parts of a PNG come out white rather than black.
  context.fillStyle = '#fff'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  image.close()

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY),
  )
  if (!blob) throw new Error("Couldn't encode the picture")
  return new File([blob], `${file.name.replace(/\.[^.]*$/, '')}.jpg`, {
    type: 'image/jpeg',
  })
}
