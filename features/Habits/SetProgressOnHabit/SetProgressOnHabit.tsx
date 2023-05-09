import { useState } from 'react'
import { Habit } from '../habits.types'
import BatteryIcon from '../../../components/Icons/Battery'
import EditIcon from '../../../components/Icons/EditIcon'

import style from './SetProgressOnHabit.module.scss'
import { ProgressForm } from './ProgressForm'
import { getCurrentProgress } from '../helpers'
import { Flex, Text, useDisclosure } from '@chakra-ui/react'

const SetProgressOnHabit: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const progress = getCurrentProgress(habit)

    return (
        <>
            <Flex gap={3} alignItems='center'>
                <BatteryIcon
                    current={progress}
                    total={habit.target}
                    boxSize={6}
                />
                <Text fontWeight={700}>
                    {progress} / {habit.target}
                </Text>
                <EditIcon onClick={onOpen} cursor='pointer' mt={0.5} />
            </Flex>
            <ProgressForm
                progressFormOpen={isOpen}
                onProgressFormClose={onClose}
                habit={habit}
            />
        </>
    )
}

export default SetProgressOnHabit
