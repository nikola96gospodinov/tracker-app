import { useState } from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { RiDeleteBin6Fill } from 'react-icons/ri'

import DeleteDoc from '../../../../components/DeleteDoc'
import Spinner from '../../../../components/spinner'
import useGetDocs from '../../../../hooks/useGetDoc'
import { HABITS } from '../../constants'
import { Habit } from '../../types'
import style from '../habit.module.scss'
import HabitForm from '../HabitForm'

export const HabitBox: React.FunctionComponent<{
    habit: Habit
    userID: string
}> = ({ habit, userID }) => {
    const { docs: habits } = useGetDocs<Habit>({ userID, path: HABITS })
    const [editFormOpen, setEditFormOpen] = useState(false)
    const [deleteWarning, setDeleteWarning] = useState(false)

    if (!habits) return <Spinner />

    return (
        <>
            <div className={style.habitBox}>
                <h3>{habit.name}</h3>
                <p>{habit.description}</p>
                <p>
                    <strong>Target:</strong> {habit.target} {habit.metric}{' '}
                    {habit.type}
                </p>
                <p>
                    <strong>Longest Streak:</strong> {habit.longestStreak}
                </p>

                <div className={style.type}></div>
                <div className={style.iconHolder}>
                    <AiTwotoneEdit
                        className={style.editIcon}
                        onClick={() => setEditFormOpen(true)}
                    />
                    <RiDeleteBin6Fill
                        className={style.deleteIcon}
                        onClick={() => setDeleteWarning(true)}
                    />
                </div>
            </div>
            {editFormOpen && (
                <HabitForm
                    setHabitsFormOpen={setEditFormOpen}
                    userID={userID}
                    habit={habit}
                />
            )}
            {deleteWarning && (
                <DeleteDoc
                    setDeleteWarning={setDeleteWarning}
                    userID={userID}
                    doc={habit}
                    docs={habits}
                    path={HABITS}
                />
            )}
        </>
    )
}
