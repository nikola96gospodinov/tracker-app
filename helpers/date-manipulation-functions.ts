import moment from 'moment'
import { Moment } from 'moment'

export const formatDate = (date: Moment): string => date.format('YYYY-MM-DD')
export const goOneDayBack = (date: string | undefined | null): string =>
    moment(date).subtract(1, 'day').format('YYYY-MM-DD')
export const goOneDayForward = (date: string | undefined | null): string =>
    moment(date).add(1, 'day').format('YYYY-MM-DD')
export const formatDateForUI = (
    date: Moment | string | Date | undefined
): string => moment(date).format('Do MMM YYYY')
export const formatWeek = (
    date: Moment | string | Date | undefined
): string => {
    const week = moment(date).isoWeek()
    const year = moment(date).year()
    return `Week ${week}, ${year}`
}

export const today = formatDate(moment())
export const yesterday = formatDate(moment().subtract(1, 'days'))
export const thisWeek = formatWeek(moment())
export const lastWeek = formatWeek(moment().subtract(7, 'days'))
