import moment from 'moment'
import {
    today,
    thisWeek,
    formatWeek
} from '../../helpers/date-manipulation-functions'
import { Habit } from '../../types/habits.types'
import { ActivePeriod } from './data'

export const calculatePartialProgress = (
    incompletedHabits: Habit[]
): number => {
    return incompletedHabits.reduce((accumulator, habit) => {
        if (habit.target > 1 && habit.progress) {
            if (
                (habit.type === 'daily' &&
                    habit.progress.dateOfProgress === today) ||
                (habit.type === 'weekly' &&
                    formatWeek(habit.progress.dateOfProgress) === thisWeek)
            ) {
                return accumulator + habit.progress.totalProgress / habit.target
            }
        }

        return accumulator
    }, 0)
}

export const filterBasedOnPeriod = (
    date: string,
    period?: ActivePeriod
): boolean => {
    // We don't want to show anything that is on the previous tabs
    const startDate = moment().startOf('isoWeek').add(1, 'week')
    const formattedDeadline = moment(date)

    switch (period) {
        case 'Whithin a Month':
            const oneMonth = moment().add(1, 'month')
            return formattedDeadline.isBetween(
                startDate,
                oneMonth,
                undefined,
                '[]'
            )
        case 'Whithin Three Months':
            const threeMonths = moment().add(3, 'month')
            return formattedDeadline.isBetween(
                startDate,
                threeMonths,
                undefined,
                '[]'
            )
        case 'Whithin Six Months':
            const sixMonths = moment().add(6, 'month')
            return formattedDeadline.isBetween(
                startDate,
                sixMonths,
                undefined,
                '[]'
            )
        case 'Whithin a Year':
            const oneYear = moment().add(1, 'year')
            return formattedDeadline.isBetween(
                startDate,
                oneYear,
                undefined,
                '[]'
            )
    }

    return false
}
