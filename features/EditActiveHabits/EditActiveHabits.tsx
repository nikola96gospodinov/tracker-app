import { FunctionComponent } from 'react'
import { Box, Text, Tooltip, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Spinner } from '../../components/UIElements/Spinner'
import { ErrorFetchingDocs } from '../../components/Docs/ErrorFetchingDocs'
import { HABITS } from '../../constants/habitsConstants'
import { ActiveHabits } from './ActiveHabits'
import { InactiveHabits } from './InactiveHabits'
import NoDocsYet from '../../components/Docs/NoDocsYet'
import { FormModal } from '../../components/Form/FormModal'
import { Habit } from '../../types/habits.types'
import { Goal } from '../../types/goals.types'
import QuestionMarkIcon from '../../components/Icons/QuestionMark'

export const EditActiveHabits: FunctionComponent<{
    isOpen: boolean
    onClose: () => void
    activeHabits: Habit[]
    inactiveHabits: Habit[]
    loading: boolean
    errorFetching: boolean
    isOnGoal?: boolean
    goal?: Goal
    activeAttachedHabits?: Habit[]
    activeKeystoneHabits?: Habit[]
}> = ({
    isOpen,
    onClose,
    activeHabits,
    inactiveHabits,
    loading,
    errorFetching,
    isOnGoal,
    goal,
    activeAttachedHabits,
    activeKeystoneHabits
}) => {
    const router = useRouter()
    const noHabits = activeHabits.length === 0 && inactiveHabits.length === 0
    const showContent = !loading && !errorFetching && !noHabits
    const isOnDashboard = Boolean(activeAttachedHabits || activeKeystoneHabits)

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
            {showContent && (
                <VStack gap={6} align='flex-start'>
                    <Box>
                        <Text fontSize='lg' mb={2}>
                            Active Habits:
                            {isOnDashboard && (
                                <Tooltip label='This includes keystone habits and habits attached to goals'>
                                    <Text as='span'>
                                        <QuestionMarkIcon
                                            ml={2}
                                            transform='translateY(2px)'
                                        />
                                    </Text>
                                </Tooltip>
                            )}
                        </Text>
                        <ActiveHabits
                            habits={activeHabits}
                            isOnGoal={isOnGoal}
                            goal={goal}
                            activeAttachedHabits={activeAttachedHabits}
                            activeKeystoneHabits={activeKeystoneHabits}
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
