import {
    collection,
    deleteDoc,
    doc,
    updateDoc,
    setDoc
} from 'firebase/firestore'
import { ToastProps } from '@chakra-ui/react'

import { MILESTONES } from '../../../../constants/goalsConstants'
import { Milestone } from '../../../../types/goals.types'
import { db } from '../../../../firebase/firebase'
import { Dispatch } from '../../../../typings'
import { Toast, toastConfig } from '../../../../components/UIElements/Toast'
import { today } from '../../../../helpers/date-manipulation-functions'

const getMilestonesCollection = (userID: string) => {
    return collection(db, `users/${userID}/${MILESTONES}`)
}

interface AddMilestoneProps {
    userID: string
    newMilestone: Milestone
    setSubmitError: Dispatch<boolean>
    toast: any
}

export const addMilestone = async ({
    userID,
    newMilestone,
    setSubmitError,
    toast
}: AddMilestoneProps) => {
    const milestonesCollection = getMilestonesCollection(userID)
    const milestonesRef = doc(milestonesCollection, newMilestone.id)

    try {
        await setDoc(milestonesRef, newMilestone)
        setSubmitError(false)
        toast({
            ...toastConfig,
            render: ({ onClose }: ToastProps) => (
                <Toast
                    type='success'
                    text='Milestone successfully added'
                    onClose={onClose}
                />
            )
        })
    } catch (e) {
        console.log(e)
        setSubmitError(true)
        toast({
            ...toastConfig,
            render: ({ onClose }: ToastProps) => (
                <Toast
                    type='error'
                    text='There was an error creating your milestone. Please refresh and try again'
                    onClose={onClose}
                />
            )
        })
    }
}

interface DeleteMilestoneProps {
    userID: string
    milestone: Milestone
    toast: any // Can't find the type for toast
}

export const deleteMilestone = async ({
    userID,
    milestone,
    toast
}: DeleteMilestoneProps) => {
    const milestonesCollection = getMilestonesCollection(userID)
    const milestoneRef = doc(milestonesCollection, milestone.id)

    try {
        await deleteDoc(milestoneRef)
        toast({
            ...toastConfig,
            render: ({ onClose }: ToastProps) => (
                <Toast
                    type='success'
                    text='Milestone successfully deleted'
                    onClose={onClose}
                />
            )
        })
    } catch (e) {
        console.log(e)
        toast({
            ...toastConfig,
            render: ({ onClose }: ToastProps) => (
                <Toast
                    type='error'
                    text='There was an error deleting your milestone. Please refresh and try again'
                    onClose={onClose}
                />
            )
        })
    }
}

interface ToggleMilestoneProps {
    userID: string
    milestone: Milestone
    toast: any
}

export const toggleMilestone = async ({
    userID,
    milestone,
    toast
}: ToggleMilestoneProps) => {
    const milestonesCollection = getMilestonesCollection(userID)
    const milestonesRef = doc(milestonesCollection, milestone.id)

    const progress = (() => {
        if (
            milestone.progress &&
            milestone.target &&
            milestone.completed &&
            milestone.progress >= milestone.target
        ) {
            return milestone.target - 1
        }

        return milestone.progress
    })()

    try {
        updateDoc(milestonesRef, {
            completed: !milestone.completed,
            progress,
            completedOn: !milestone.completed ? today : ''
        })
        toast({
            ...toastConfig,
            render: ({ onClose }: ToastProps) => (
                <Toast
                    type='success'
                    text='Milestone successfully changed'
                    onClose={onClose}
                />
            )
        })
    } catch (e) {
        console.log(e)
        toast({
            ...toastConfig,
            render: ({ onClose }: ToastProps) => (
                <Toast
                    type='error'
                    text='There was an error updating your milestone. Please refresh and try again'
                    onClose={onClose}
                />
            )
        })
    }
}

interface EditMilestoneProps {
    userID: string
    updatedMilestone: Milestone
    setActiveMilestone?: Dispatch<Milestone | undefined>
    toast: any
}

export const editMilestone = async ({
    userID,
    updatedMilestone,
    setActiveMilestone,
    toast
}: EditMilestoneProps) => {
    const milestonesCollection = getMilestonesCollection(userID)
    const milestonesRef = doc(milestonesCollection, updatedMilestone.id)

    try {
        setDoc(
            milestonesRef,
            {
                ...updatedMilestone
            },
            { merge: true }
        )
        if (setActiveMilestone) setActiveMilestone(undefined)
        toast({
            ...toastConfig,
            render: ({ onClose }: ToastProps) => (
                <Toast
                    type='success'
                    text='Milestone successfully updated'
                    onClose={onClose}
                />
            )
        })
    } catch (e) {
        console.log(e)
        toast({
            ...toastConfig,
            render: ({ onClose }: ToastProps) => (
                <Toast
                    type='error'
                    text='There was an error updating your milestone. Please refresh and try again'
                    onClose={onClose}
                />
            )
        })
    }
}

interface DeleteMilestonesFromDeletedGoalProps {
    userId: string | undefined
    milestones?: Milestone[]
}

export const deleteMilestonesFromDeletedGoal = async ({
    userId,
    milestones
}: DeleteMilestonesFromDeletedGoalProps) => {
    const fullPath = `users/${userId}/${MILESTONES}`
    const milestonesCollection = collection(db, fullPath)

    for (const milestone of milestones ?? []) {
        const milestoneRef = doc(milestonesCollection, milestone.id)
        try {
            await deleteDoc(milestoneRef)
        } catch (e) {
            console.log(e)
        }
    }
}
