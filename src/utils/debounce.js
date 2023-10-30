/* eslint-disable n/no-callback-literal */
export function debounce (callback, delay = 300) {
  let timerId
  return (...args) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
