import { useContext } from 'react'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Spinner } from '../../../../../components/UIElements/Spinner'
import useGetFilteredDocs from '../../../../../hooks/useGetFilteredDocs'
import { HABITS } from '../../../../habits/constants'
import { Habit } from '../../../../habits/habits.types'
import { Goal } from '../../../goals.types'
import UpdateHabitsList from '../UpdateHabitList'
import WeeklyHabitsList from './WeeklyHabitsList'
import { UserContext } from '../../../../../context/userContext'
import { ErrorFetchingDocs } from '../../../../../components/Docs/ErrorFetchingDocs'
import NoDocsYet from '../../../../../components/Docs/NoDocsYet'

const WeeklyHabitsContent: React.FunctionComponent<{
    goal: Goal | undefined
    newElementAdded: boolean
    shortName: string
}> = ({ goal, newElementAdded, shortName }) => {
    const router = useRouter()
    const { userId } = useContext(UserContext)
    const {
        docs: weeklyTargets,
        loading,
        errorFetching
    } = useGetFilteredDocs<Habit>({
        userID: userId,
        path: HABITS,
        fieldPath: 'type',
        opStr: '==',
        value: 'weekly'
    })

    if (loading) return <Spinner mt={8} />

    if (errorFetching) return <ErrorFetchingDocs docType={HABITS} />

    const noWeeklyTargets = weeklyTargets?.length === 0 || !weeklyTargets
    const showUpdateTargetsList = newElementAdded

    return (
        <Box mt={8}>
            {noWeeklyTargets && (
                <NoDocsYet
                    docType={shortName}
                    onClick={() => router.push('/habits')}
                />
            )}
            {showUpdateTargetsList && (
                <UpdateHabitsList
                    allHabits={weeklyTargets}
                    attachedHabits={goal?.weeklyHabits}
                    goal={goal}
                    userID={userId}
                    shortName={shortName}
                />
            )}
            {goal && (
                <WeeklyHabitsList goal={goal} weeklyTargets={weeklyTargets} />
            )}
        </Box>
    )
}

export default WeeklyHabitsContent
