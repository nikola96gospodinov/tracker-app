import { MenuItem, useToast } from '@chakra-ui/react'
import { FunctionComponent, useContext } from 'react'

import { UserContext } from '../../../context/userContext'
import { onKeystoneStatusChange } from '../../Habits/helpers'
import { Habit } from '../../../types/habits.types'

export const ChangeKeystoneStatus: FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    const toast = useToast()
    const { userId } = useContext(UserContext)

    const itemText = habit.isKeystone
        ? 'Remove from keystone habits 🪨'
        : 'Make a keystone habits 🪨'

    return (
        <MenuItem
            onClick={() => {
                onKeystoneStatusChange({
                    userId,
                    habitId: habit.id,
                    isKeystone: habit.isKeystone,
                    toast
                })
            }}
        >
            {itemText}
        </MenuItem>
    )
}
