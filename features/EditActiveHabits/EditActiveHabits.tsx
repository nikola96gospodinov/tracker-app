import { FunctionComponent } from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Spinner } from '../../components/UIElements/Spinner'
import { ErrorFetchingDocs } from '../../components/Docs/ErrorFetchingDocs'
import { HABITS } from '../../pages/habits/constants'
import { ActiveHabits } from './ActiveHabits'
import { InactiveHabits } from './InactiveHabits'
import NoDocsYet from '../../components/Docs/NoDocsYet'
import { FormModal } from '../../components/Form/FormModal'
import { Habit } from '../../pages/habits/habits.types'
import { Goal } from '../../pages/goals/goals.types'

export const EditActiveHabits: FunctionComponent<{
    isOpen: boolean
    onClose: () => void
    activeHabits: Habit[]
    inactiveHabits: Habit[]
    loading: boolean
    errorFetching: boolean
    isOnGoal?: boolean
    goal?: Goal
}> = ({
    isOpen,
    onClose,
    activeHabits,
    inactiveHabits,
    loading,
    errorFetching,
    isOnGoal,
    goal
}) => {
    const router = useRouter()
    const noHabits = activeHabits.length === 0 && inactiveHabits.length === 0

    return (
        <FormModal formOpen={isOpen} onFormClose={onClose} onSubmit={() => {}}>
            {loading && <Spinner text='Loading...' />}
            {errorFetching && <ErrorFetchingDocs docType={HABITS} size='sm' />}
            {noHabits && (
                <NoDocsYet
                    docType={HABITS}
                    onClick={() =>
                        router.push(
                            { pathname: '/habits', query: { formOpen: true } },
                            '/habits'
                        )
                    }
                    size='sm'
                />
            )}
            {!loading && !errorFetching && !noHabits && (
                <VStack gap={6} align='flex-start'>
                    <Box>
                        <Text fontSize='lg' mb={2}>
                            Active Habits:
                        </Text>
                        <ActiveHabits
                            habits={activeHabits}
                            isOnGoal={isOnGoal}
                            goal={goal}
                        />
                    </Box>
                    <Box>
                        <Text fontSize='lg' mb={2}>
                            Inactive Habits:
                        </Text>
                        <InactiveHabits
                            habits={inactiveHabits}
                            isOnGoal={isOnGoal}
                            goal={goal}
                        />
                    </Box>
                </VStack>
            )}
        </FormModal>
    )
}
