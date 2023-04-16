import { useCallback, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { FormModal } from '../../../components/Form/FormModal'
import { Button } from '../../../components/UIElements/Button'
import { Dispatch } from '../../../typings'
import { Input } from '../../../components/Form/Input'

import styles from './SetProgressOnHabit.module.scss'
import ToggleSwitch from '../../../components/UIElements/ToggleSwitch'
import { updateHabitProgress } from '../helpers'
import { auth } from '../../../firebase/firebase'

export const ProgressForm: React.FunctionComponent<{
    progressFormOpen: boolean
    setProgressFormOpen: Dispatch<boolean>
    progress: number
    target: number
    habitID: string
}> = ({ progressFormOpen, setProgressFormOpen, progress, target, habitID }) => {
    const [progressValue, setProgressValue] = useState<number>(progress)
    const [user] = useAuthState(auth)

    const handleToggleSwitchChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.checked) {
            setProgressValue(target)
        } else {
            setProgressValue(progress)
        }
    }

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            updateHabitProgress({
                progress: progressValue,
                habitID,
                userID: user?.uid ?? ''
            })
            setProgressFormOpen(false)
        },
        [habitID, progressValue, setProgressFormOpen, user?.uid]
    )

    const completed = progressValue >= target
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
