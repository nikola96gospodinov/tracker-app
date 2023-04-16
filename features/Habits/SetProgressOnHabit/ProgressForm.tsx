import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import moment from 'moment'

import { FormModal } from '../../../components/Form/FormModal'
import { Button } from '../../../components/UIElements/Button'
import { Dispatch } from '../../../typings'
import { Input } from '../../../components/Form/Input'

import styles from './SetProgressOnHabit.module.scss'
import ToggleSwitch from '../../../components/UIElements/ToggleSwitch'
import { getCurrentProgress, updateHabitProgress } from '../helpers'
import { auth } from '../../../firebase/firebase'
import { Habit, Progress } from '../habits.types'
import { formatDate } from '../../../helpers/date-manipulation-functions'

export const ProgressForm: React.FunctionComponent<{
    progressFormOpen: boolean
    setProgressFormOpen: Dispatch<boolean>
    habit: Habit
}> = ({ progressFormOpen, setProgressFormOpen, habit }) => {
    const currentProgress = getCurrentProgress(habit.progress)
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
        setProgressFormOpen(false)
    }
    const toggleText = completed ? 'Completed!' : 'Set as completed'

    return (
        <>
            {progressFormOpen && (
                <FormModal
                    setFormOpen={setProgressFormOpen}
                    onSubmit={handleSubmit}
                    title='Set Progress'
                >
                    <div className={styles.progressFormInputContainer}>
                        <h3>Current progress: </h3>
                        <Input
                            type='number'
                            onChange={(e) => setProgressValue(+e.target.value)}
                            value={progressValue}
                            min={0}
                        />
                    </div>

                    <div className={styles.valueChangesHolder}>
                        <ToggleSwitch
                            text={toggleText}
                            checked={completed}
                            onChange={handleToggleSwitchChange}
                        />

                        <div className={styles.btnHolders}>
                            <Button
                                type='button'
                                text='- 1'
                                btnClass='button-secondary'
                                onClick={() =>
                                    setProgressValue((prev) =>
                                        prev === 0 ? 0 : prev - 1
                                    )
                                }
                            />
                            <Button
                                type='button'
                                text='Reset'
                                btnClass='button-secondary'
                                onClick={() => setProgressValue(0)}
                            />
                            <Button
                                type='button'
                                text='+ 1'
                                btnClass='button-secondary'
                                onClick={() =>
                                    setProgressValue((prev) => prev + 1)
                                }
                            />
                        </div>
                    </div>

                    <Button
                        text='Set progress'
                        btnClass='button-primary'
                        type='submit'
                    />
                </FormModal>
            )}
        </>
    )
}
