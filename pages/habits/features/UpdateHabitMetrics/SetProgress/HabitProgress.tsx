import { Text, useDisclosure } from '@chakra-ui/react'

import EditIcon from '../../../../../components/Icons/EditIcon'
import { Habit } from '../../../habits.types'
import { ProgressForm } from './ProgressForm'

export const HabitProgress: React.FunctionComponent<{
    progress: number
    habit: Habit
}> = ({ progress, habit }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Text>
                {progress} / {habit.target}
            </Text>
            <EditIcon onClick={() => onOpen()} />
            <ProgressForm
                progressFormOpen={isOpen}
                onProgressFormClose={onClose}
                habit={habit}
            />
        </>
    )
}
