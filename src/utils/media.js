export function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
}

export function isVideo(url) {
  return /\.(mp4|avi|ogg)$/.test(url)
}
