import { useRouter } from 'next/router'

import { TabElementProps } from '../../../types/goals.types'
import { ErrorFetchingDocs } from '../../../components/Docs/ErrorFetchingDocs'
import useGetFilteredDocs from '../../../hooks/useGetFilteredDocs'
import { HABITS } from '../../../constants/habitsConstants'
import { Habit } from '../../../types/habits.types'
import { Spinner } from '../../../components/UIElements/Spinner'
import NoDocsYet from '../../../components/Docs/NoDocsYet'
import AttachedHabitsContent from './AttachedHabitsContent'

const AttachedHabits: React.FunctionComponent<TabElementProps> = ({
    shortName,
    goal,
    type
}) => {
    const router = useRouter()
    const {
        docs: habits,
        loading,
        errorFetching
    } = useGetFilteredDocs<Habit>({
        path: HABITS,
        fieldPath: 'type',
        opStr: '==',
        value: type
    })

    const noHabits = habits?.length === 0 || !habits

    if (loading) return <Spinner mt={8} />

    if (errorFetching) return <ErrorFetchingDocs docType={HABITS} />

    if (noHabits)
        return (
            <NoDocsYet
                docType={shortName}
                onClick={() => router.push('/habits')}
            />
        )

    return (
        <AttachedHabitsContent goal={goal} shortName={shortName} type={type!} />
    )
}

export default AttachedHabits
