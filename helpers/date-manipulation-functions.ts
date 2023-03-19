import moment from 'moment'
import { Moment } from 'moment'

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

export const formatDateFromString = (date: string): string => {
    const d = new Date(date)
    const fullYear = d.getFullYear()
    const month = months[d.getMonth()]
    const day = d.getDate()
    return `${day} ${month} ${fullYear}`
}

export const formatDate = (date: Moment): string => date.format('YYYY-MM-DD')
export const goOneDayBack = (date: string | undefined | null): string =>
    moment(date).subtract(1, 'day').format('YYYY-MM-DD')
export const goOneDayForward = (date: string | undefined | null): string =>
    moment(date).add(1, 'day').format('YYYY-MM-DD')
export const formatDateForUI = (
    date: Moment | string | Date | undefined
): string => moment(date).format('Do MMM YYYY')
