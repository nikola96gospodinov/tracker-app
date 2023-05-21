import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import moment from 'moment'
import { Flex, Heading, Button } from '@chakra-ui/react'

import { FormModal } from '../../../components/Form/FormModal'
import ToggleSwitch from '../../../components/UIElements/ToggleSwitch'
import {
    getCurrentProgress,
    updateHabitProgress
} from '../../../pages/habits/helpers'
import { auth } from '../../../firebase/firebase'
import { Habit } from '../../../pages/habits/habits.types'
import { formatDate } from '../../../helpers/date-manipulation-functions'
import { Input } from '../../../components/Form/Input'

const btnStyle = {
    h: 'auto',
    py: 2,
    px: 4,
    fontSize: 'md',
    bg: 'transparent',
    boxShadow: 'none',
    color: 'purple.500',
    border: 'solid',
    borderWidth: 2,
    borderColor: 'purple.500',
    fontWeight: 600,
    _hover: {
        transform: 'none',
        color: 'neutral.50',
        boxShadow: 'none',
        backgroundColor: 'purple.500'
    }
}

export const ProgressForm: React.FunctionComponent<{
    progressFormOpen: boolean
    onProgressFormClose: () => void
    habit: Habit
}> = ({ progressFormOpen, onProgressFormClose, habit }) => {
    const currentProgress = getCurrentProgress(habit)
    const [progressValue, setProgressValue] = useState<number>(currentProgress)
    const [user] = useAuthState(auth)
    const completed = progressValue >= habit.target

    const handleToggleSwitchChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.checked) {
            setProgressValue(habit.target)
        } else {
            setProgressValue(
                currentProgress === habit.target ? 0 : currentProgress
            )
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateHabitProgress({
            progress: {
                progress: progressValue,
                dateOfProgress: formatDate(moment())
            },
            habit,
            userID: user?.uid ?? '',
            completed
        })
        onProgressFormClose()
    }
    const toggleText = completed ? 'Completed!' : 'Set as completed'

    return (
        <>
            {progressFormOpen && (
                <FormModal
                    formOpen={progressFormOpen}
                    onFormClose={onProgressFormClose}
                    onSubmit={handleSubmit}
                    title='Set Progress'
                >
                    <Flex alignItems='center' justifyContent='space-between'>
                        <Heading fontSize='lg' fontWeight={600} width='100%'>
                            Current progress:{' '}
                        </Heading>
                        <Input
                            type='number'
                            onChange={(e) => setProgressValue(+e.target.value)}
                            value={progressValue}
                            min={0}
                        />
                    </Flex>

                    <Flex
                        alignItems='center'
                        justifyContent='space-between'
                        mt={6}
                    >
                        <ToggleSwitch
                            text={toggleText}
                            isChecked={completed}
                            onChange={handleToggleSwitchChange}
                        />

                        <Flex
                            alignItems='center'
                            justifyContent='flex-end'
                            gap={2}
                        >
                            <Button
                                type='button'
                                onClick={() =>
                                    setProgressValue((prev) =>
                                        prev === 0 ? 0 : prev - 1
                                    )
                                }
                                {...btnStyle}
                            >
                                - 1
                            </Button>
                            <Button
                                type='button'
                                onClick={() => setProgressValue(0)}
                                {...btnStyle}
                            >
                                Reset
                            </Button>
                            <Button
                                type='button'
                                onClick={() =>
                                    setProgressValue((prev) => prev + 1)
                                }
                                {...btnStyle}
                            >
                                + 1
                            </Button>
                        </Flex>
                    </Flex>

                    <Button type='submit'>Set progress</Button>
                </FormModal>
            )}
        </>
    )
}
