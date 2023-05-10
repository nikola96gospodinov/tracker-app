import {
    collection,
    deleteDoc,
    doc,
    updateDoc,
    setDoc
} from 'firebase/firestore'
import { ToastProps } from '@chakra-ui/react'

import { MILESTONES } from '../../../constants'
import { Milestone } from '../../../goals.types'
import { db } from '../../../../../firebase/firebase'
import { Dispatch } from '../../../../../typings'
import { Toast } from '../../../../../components/UIElements/Toast'

const toastConfig: ToastProps = {
    position: 'top-right',
    duration: 5000
}

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

    try {
        updateDoc(milestonesRef, {
            completed: !milestone.completed
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
    setActiveMilestone: Dispatch<Milestone | undefined>
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
        setActiveMilestone(undefined)
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
