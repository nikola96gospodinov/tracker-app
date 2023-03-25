import { Dispatch, useRef, useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { addMilestone } from './helpers/crud-operations-milestones'
import { Milestone } from '../../goals.types'
import DeleteIcon from '../../../../components/Icons/DeleteIcon'
import Checkbox from '../../../../components/Form/Checkbox'

import styles from '../../goal.module.scss'
import SaveIcon from '../../../../components/Icons/SaveIcon'

export const AddMilestone: React.FunctionComponent<{
    setNewElementAdded: Dispatch<boolean>
    goalID: string
    userID: string
}> = ({ setNewElementAdded, goalID, userID }) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const deadlineRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState(false)
    const [submitError, setSubmitError] = useState(false)

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
                setSubmitError
            })
            if (!submitError) {
                setNewElementAdded(false)
                nameRef.current.value = ''
                deadlineRef.current!.value = ''
            }
        }
    }, [])

    return (
        <tr className={styles.newMilestone}>
            <td>
                <Checkbox disabled />
            </td>
            <td style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                <input type='text' ref={nameRef} />
                {error && (
                    <span style={{ marginBottom: '0' }} className='field-error'>
                        Please fill in this field
                    </span>
                )}
            </td>
            <td>
                <input type='date' ref={deadlineRef} />
            </td>
            <td>
                <SaveIcon className={styles.save} onClick={onSave} />{' '}
                <DeleteIcon className={styles.delete} onClick={onDelete} />
            </td>
        </tr>
    )
}
