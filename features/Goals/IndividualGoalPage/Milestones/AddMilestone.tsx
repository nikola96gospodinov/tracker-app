import { Dispatch, useRef, useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Td, Tr, Checkbox, Text, Flex, useToast } from '@chakra-ui/react'

import { addMilestone } from './helpers/crud-operations-milestones'
import { Milestone } from '../../goals.types'
import DeleteIcon from '../../../../components/Icons/DeleteIcon'

import styles from '../../goal.module.scss'
import SaveIcon from '../../../../components/Icons/SaveIcon'
import { Input } from '../../../../components/Form/Input'
import { iconHoverStyles, iconStyles, inputStyles } from './data'

export const AddMilestone: React.FunctionComponent<{
    setNewElementAdded: Dispatch<boolean>
    goalID: string
    userID: string
}> = ({ setNewElementAdded, goalID, userID }) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const deadlineRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState(false)
    const [submitError, setSubmitError] = useState(false)

    const toast = useToast()

    const onDelete = useCallback(() => {
        if (nameRef.current) nameRef.current.value = ''
        if (deadlineRef.current) deadlineRef.current.value = ''
        setNewElementAdded(false)
    }, [setNewElementAdded])

    const onSave = useCallback(() => {
        if (nameRef.current?.value === '' || !nameRef.current?.value) {
            setError(true)
        } else {
            const newMilestone = {
                id: uuidv4(),
                goalID,
                name: nameRef.current.value,
                completed: false,
                deadline: deadlineRef.current?.value ?? ''
            } as Milestone
            addMilestone({
                newMilestone,
                userID,
                setSubmitError,
                toast
            })
            if (!submitError) {
                setNewElementAdded(false)
                nameRef.current.value = ''
                deadlineRef.current!.value = ''
            }
        }
    }, [goalID, setNewElementAdded, submitError, userID])

    return (
        <Tr>
            <Td>
                <Checkbox
                    disabled
                    border='solid'
                    opacity={0.5}
                    borderColor='purple.500'
                    borderRadius='sm'
                    borderWidth='2px'
                    transform='scale(0.85)'
                />
            </Td>
            <Td>
                <Input type='text' ref={nameRef} {...inputStyles} />
                {error && (
                    <Text fontSize='sm' color='red.600'>
                        Please fill in this field
                    </Text>
                )}
            </Td>
            <Td>
                <Input type='date' ref={deadlineRef} {...inputStyles} />
            </Td>
            <Td>
                <Flex justifyContent='flex-end' alignItems='center'>
                    <SaveIcon
                        className={styles.save}
                        onClick={onSave}
                        {...iconStyles}
                        _hover={{
                            ...iconHoverStyles,
                            color: 'green.500'
                        }}
                        mr={2}
                    />
                    <DeleteIcon
                        className={styles.delete}
                        onClick={onDelete}
                        {...iconStyles}
                        _hover={{
                            ...iconHoverStyles,
                            color: 'red.500'
                        }}
                    />
                </Flex>
            </Td>
        </Tr>
    )
}
