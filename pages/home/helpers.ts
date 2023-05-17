import {
    today,
    thisWeek,
    formatWeek
} from '../../helpers/date-manipulation-functions'
import { Habit } from '../habits/habits.types'

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
                return accumulator + habit.progress.progress / habit.target
            }
        }

        return accumulator
    }, 0)
}
