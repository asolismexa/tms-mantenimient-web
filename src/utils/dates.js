import dayjs from 'dayjs'

export function formatDate(dateString) {
  return dayjs(dateString).utc().format('DD MMM YYYY HH:mm')
}
