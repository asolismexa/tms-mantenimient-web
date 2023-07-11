import dayjs from 'dayjs'

export function formatDate(dateString) {
  return dayjs(dateString).utc().local().format('DD MMM YYYY HH:mm')
}

export function dateTimeToString(date) {
  return dayjs(date).utc().format()
}

export function utcToLocal(date) {
  return dayjs(date).utc().local()
}
