import { Box, MenuItem, VStack, useDisclosure, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import { difference } from 'lodash'

import { FormModal } from '../../../../components/Form/FormModal'
import { Goal } from '../../../../types/goals.types'
import { GOALS } from '../../../../constants/goalsConstants'
import { Spinner } from '../../../../components/UIElements/Spinner'
import { ErrorFetchingDocs } from '../../../../components/Docs/ErrorFetchingDocs'
import NoDocsYet from '../../../../components/Docs/NoDocsYet'
import { Habit } from '../../../../types/habits.types'
import useGetFilteredDocs from '../../../../hooks/useGetFilteredDocs'
import { AttachedGoals } from './AttachedGoals'
import { UnattachedGoals } from './UnattachedGoals'

export const ConfigureGoals: FunctionComponent<{
    habit: Habit
    onOpen: () => void
    onClose: () => void
    isOpen: boolean
}> = ({ habit, isOpen, onOpen, onClose }) => {
    const router = useRouter()

    const {
        docs: goals,
        loading,
        errorFetching
    } = useGetFilteredDocs<Goal>({
        path: GOALS,
        fieldPath: 'status',
        opStr: '==',
        value: 'active'
    })

    const attachedGoals = goals?.filter((goal) => {
        if (habit.type === 'daily') {
            return goal.dailyHabits?.includes(habit.id)
        }

        if (habit.type === 'weekly') {
            return goal.weeklyHabits?.includes(habit.id)
        }
    })

    const unattachedGoals = difference(goals, attachedGoals ?? [])

    const showContent = !loading && !errorFetching && goals?.length !== 0

    return (
        <>
            <MenuItem onClick={onOpen}>Manage Attached Goals</MenuItem>
            <FormModal
                formOpen={isOpen}
                onFormClose={onClose}
                onSubmit={() => {}}
            >
                {loading && <Spinner text='Loading...' />}
                {errorFetching && (
                    <ErrorFetchingDocs docType={GOALS} size='sm' />
                )}
                {goals?.length === 0 && (
                    <NoDocsYet
                        docType={GOALS}
                        onClick={() =>
                            router.push(
                                {
                                    pathname: '/goals',
                                    query: { formOpen: true }
                                },
                                '/goals'
                            )
                        }
                        size='sm'
                    />
                )}
                {showContent && (
                    <VStack gap={6} align='flex-start'>
                        <Box>
                            <Text fontSize='lg' mb={2}>
                                Attached Goals:
                            </Text>
                            <AttachedGoals
                                goals={attachedGoals}
                                habit={habit}
                            />
                        </Box>
                        <Box>
                            <Text fontSize='lg' mb={2}>
                                Remaining Goals:
                            </Text>
                            <UnattachedGoals
                                goals={unattachedGoals}
                                habit={habit}
                            />
                        </Box>
                    </VStack>
                )}
            </FormModal>
        </>
    )
}
