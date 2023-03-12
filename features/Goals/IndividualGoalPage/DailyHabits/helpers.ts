import moment from 'moment'
import {
    formatDate,
    goOneDayBack,
    goOneDayForward
} from '../../../../helpers/date-manipulation-functions'
import { Habit } from '../../../Habits/habits.types'

const today = formatDate(moment())

export const getUpdatedStreaks = (habit: Habit, completedToday: boolean) => {
    const longestStreak = habit.longestStreak
    const currentStreak = habit.currentStreak
    const completedYesterday =
        moment(habit.currentStreak?.end) === moment().subtract(1, 'days')

    let newStreak = currentStreak

    if (completedYesterday) {
        if (completedToday) {
            newStreak = {
                streak: newStreak.streak--,
                start: newStreak?.start,
                end: goOneDayBack(newStreak?.end)
            }
        } else {
            newStreak = {
                streak: newStreak.streak++,
                start: newStreak?.start,
                end: goOneDayForward(newStreak?.end)
            }
        }
    } else {
        if (completedToday) {
            if (newStreak?.start === newStreak?.end) {
                newStreak = {
                    streak: 0,
                    start: null,
                    end: null
                }
            } else {
                newStreak = {
                    streak: newStreak.streak--,
                    start: newStreak?.start,
                    end: goOneDayBack(newStreak?.end)
                }
            }
        } else {
            newStreak = {
                streak: 1,
                start: today,
                end: today
            }
        }
    }

    if (longestStreak.streak <= newStreak.streak) {
        return {
            longestStreak: newStreak,
            currentStreak: newStreak
        }
    } else {
        return {
            longestStreak,
            currentStreak: newStreak
        }
    }
}
