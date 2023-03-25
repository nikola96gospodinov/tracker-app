import { Habit } from '../../../Habits/habits.types'
import { Goal } from '../../goals.types'
import HabitCell from '../DailyHabits/HabitCell'

const WeeklyHabitsList: React.FunctionComponent<{
    goal: Goal
    weeklyTargets?: Habit[]
}> = ({ goal, weeklyTargets }) => {
    const attachedTargets = weeklyTargets?.filter(({ id }) =>
        goal.targets?.includes(id)
    )

    return (
        <div className='triple-grid' style={{ marginTop: '1rem' }}>
            {attachedTargets?.map((target) => (
                <HabitCell key={target.id} habit={target} />
            ))}
        </div>
    )
}

export default WeeklyHabitsList
