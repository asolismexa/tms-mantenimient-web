export const mettersToKilometers = (meters, label = true) => {
  const result = Math.round(meters / 1000)
  return result.toLocaleString('en-US') + (label ? ' KM' : '')
}
