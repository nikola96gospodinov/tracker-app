import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { HABITS } from '../features/Habits/constants'
import { Habit } from '../features/Habits/habits.types'
import { removeHabitFromGoalsOnDelete } from '../features/Habits/helpers'
import { removeDoc } from '../helpers/crud-operations/crud-operations-main-docs'
import { removeLastCharacter } from '../helpers/string-manipulation-functions'
import { useGetRelevantGoals } from '../hooks/useGetRelevantGoals'
import { Doc } from '../types/crud-opearations.types'
import { Dispatch } from '../typings'

interface Props<T> {
    setDeleteWarning: Dispatch<boolean>
    userID: string
    doc: T
    path: string
}

const DeleteDoc = <T extends Doc>({
    setDeleteWarning,
    userID,
    doc,
    path
}: Props<T>) => {
    const router = useRouter()
    const [error, setError] = useState(false)
    const singularPath = removeLastCharacter(path)
    const { relevantGoals } = useGetRelevantGoals({
        habitID: doc.id,
        habitType: doc.hasOwnProperty('type') ? (doc as Habit).type : 'daily'
    })

    const handleDelete = useCallback(() => {
        removeDoc({
            path,
            orgDoc: doc,
            userID,
            router,
            setError
        })

        if (path === HABITS) {
            removeHabitFromGoalsOnDelete({
                userID,
                relevantGoals,
                habitID: doc.id
            })
        }
    }, [doc, path, userID])

    return (
        <div className='backdrop'>
            <div className='form-container'>
                <p style={{ fontSize: '1.125rem', textAlign: 'center' }}>
                    Are you sure you want to <b>delete</b> the {singularPath}?
                </p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gridGap: '1rem',
                        marginTop: '2rem'
                    }}
                >
                    <button
                        className='button button-delete'
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button
                        className='button button-tertiary'
                        onClick={() => setDeleteWarning(false)}
                    >
                        Cancel
                    </button>
                </div>
                {error && (
                    <p className='form-error' style={{ marginTop: '1.5rem' }}>
                        There was an error deleting the {singularPath}. Please
                        try again
                    </p>
                )}
            </div>
        </div>
    )
}

export default DeleteDoc
