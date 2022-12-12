import { useRouter } from 'next/router'
import { useState } from 'react'

import { deleteGoal } from '../../helpers/crud-operations'
import { Goal } from '../../interfaces'

interface Props {
    setDeleteWarning: React.Dispatch<React.SetStateAction<boolean>>
    userID: string
    goals: Goal[]
    goal: Goal
}

const DeleteGoal = ({ setDeleteWarning, userID, goals, goal }: Props) => {
    const router = useRouter()
    const [error, setError] = useState(false)

    return (
        <div className='backdrop'>
            <div className='form-container'>
                <p style={{ fontSize: '1.125rem', textAlign: 'center' }}>Are you sure you want to <b>delete</b> the goal?</p>
                <div style={{ display: 'flex', justifyContent: 'center', gridGap: '1rem', marginTop: '2rem' }}>
                    <button
                        className='button button-delete'
                        onClick={() => deleteGoal({
                            goals,
                            goal,
                            userID,
                            router,
                            setError
                        })}
                    >Delete</button>
                    <button
                        className='button button-tertiary'
                        onClick={() => setDeleteWarning(false)}
                    >Cancel</button>
                </div>
                { error && <p className='form-error' style={{ marginTop: '1.5rem' }}>There was an error deleting the goal. Please try again</p> }
            </div>
        </div>
    )
}

export default DeleteGoal