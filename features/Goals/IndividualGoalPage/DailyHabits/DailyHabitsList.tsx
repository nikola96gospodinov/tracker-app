import { Habit } from '../../../Habits/habits.types'
import { Goal } from '../../goals.types'
import HabitCell from '../HabitCell'

const DailyHabitsList: React.FunctionComponent<{
    goal: Goal
    dailyHabits?: Habit[]
}> = ({ goal, dailyHabits }) => {
    const attachedHabits = dailyHabits?.filter(({ id }) =>
        goal.dailyHabits?.includes(id)
    )

    return (
        <div className='triple-grid' style={{ marginTop: '1rem' }}>
            {attachedHabits?.map((habit) => (
                <HabitCell key={habit.id} habit={habit} />
            ))}
        </div>
    )
}

export default DailyHabitsList
