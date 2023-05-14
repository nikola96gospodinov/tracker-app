import { useContext } from 'react'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Spinner } from '../../../../../components/UIElements/Spinner'
import useGetFilteredDocs from '../../../../../hooks/useGetFilteredDocs'
import { HABITS } from '../../../../habits/constants'
import { Habit } from '../../../../habits/habits.types'
import { Goal } from '../../../goals.types'
import DailyHabitsList from './DailyHabitsList'
import NoDocsYet from '../../../../../components/Docs/NoDocsYet'
import UpdateHabitList from '../UpdateHabitList'
import { UserContext } from '../../../../../context/userContext'
import { ErrorFetchingDocs } from '../../../../../components/Docs/ErrorFetchingDocs'
import { Dispatch } from '../../../../../typings'

const DailyHabitsContent: React.FunctionComponent<{
    goal: Goal | undefined
    newElementAdded: boolean
    shortName: string
    setNewElementAdded: Dispatch<boolean>
}> = ({ goal, newElementAdded, shortName, setNewElementAdded }) => {
    const router = useRouter()
    const { userId } = useContext(UserContext)
    const {
        docs: dailyHabits,
        loading,
        errorFetching
    } = useGetFilteredDocs<Habit>({
        userID: userId,
        path: HABITS,
        fieldPath: 'type',
        opStr: '==',
        value: 'daily'
    })

    if (loading) return <Spinner mt={8} />

    if (errorFetching) return <ErrorFetchingDocs docType={HABITS} />

    const noDailyHabits = dailyHabits?.length === 0 || !dailyHabits
    const showUpdateHabitsList = newElementAdded

    return (
        <Box mt={8}>
            {noDailyHabits && (
                <NoDocsYet
                    docType={shortName}
                    onClick={() => router.push('/habits')}
                />
            )}
            {showUpdateHabitsList && (
                <UpdateHabitList
                    allHabits={dailyHabits}
                    attachedHabits={goal?.dailyHabits}
                    goal={goal}
                    userID={userId}
                    shortName={shortName}
                    setNewElementAdded={setNewElementAdded}
                />
            )}
            {goal && <DailyHabitsList goal={goal} dailyHabits={dailyHabits} />}
        </Box>
    )
}

export default DailyHabitsContent
