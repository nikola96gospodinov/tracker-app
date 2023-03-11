import {
    collection,
    deleteDoc,
    doc,
    updateDoc,
    setDoc
} from 'firebase/firestore'

import { MILESTONES } from './../constants'
import { Milestone } from '../goals.types'
import { db } from '../../../firebase/firebase'
import { Dispatch } from '../../../typings'
import { customToast } from '../../../helpers/customToast'

const getMilestonesCollection = (userID: string) => {
    return collection(db, `users/${userID}/${MILESTONES}`)
}

interface AddMilestoneProps {
    userID: string
    newMilestone: Milestone
    setSubmitError: Dispatch<boolean>
}

export const addMilestone = async ({
    userID,
    newMilestone,
    setSubmitError
}: AddMilestoneProps) => {
    const milestonesCollection = getMilestonesCollection(userID)
    const milestonesRef = doc(milestonesCollection, newMilestone.id)

    try {
        await setDoc(milestonesRef, newMilestone)
        setSubmitError(false)
        customToast({
            message: 'Milestone successfully added',
            type: 'success'
        })
    } catch (e) {
        console.log(e)
        setSubmitError(true)
        customToast({
            message:
                'There was an error creating your milestone. Please refresh and try again',
            type: 'error'
        })
    }
}

interface DeleteMilestoneProps {
    userID: string
    milestone: Milestone
}

export const deleteMilestone = async ({
    userID,
    milestone
}: DeleteMilestoneProps) => {
    const milestonesCollection = getMilestonesCollection(userID)
    const milestoneRef = doc(milestonesCollection, milestone.id)

    try {
        await deleteDoc(milestoneRef)
        customToast({
            message: 'Milestone successfully deleted',
            type: 'success'
        })
    } catch (e) {
        console.log(e)
        customToast({
            message:
                'There was an error deleting your milestone. Please refresh and try again',
            type: 'error'
        })
    }
}

interface ToggleMilestoneProps {
    userID: string
    milestone: Milestone
}

export const toggleMilestone = async ({
    userID,
    milestone
}: ToggleMilestoneProps) => {
    const milestonesCollection = getMilestonesCollection(userID)
    const milestonesRef = doc(milestonesCollection, milestone.id)

    try {
        updateDoc(milestonesRef, {
            completed: !milestone.completed
        })
    } catch (e) {
        console.log(e)
        customToast({
            message:
                'There was an error updating your milestone. Please refresh and try again',
            type: 'error'
        })
    }
}

interface EditMilestoneProps {
    userID: string
    updatedMilestone: Milestone
    setActiveMilestone: Dispatch<Milestone | undefined>
}

export const editMilestone = async ({
    userID,
    updatedMilestone,
    setActiveMilestone
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
        customToast({
            message: 'Milestone successfully updated',
            type: 'success'
        })
    } catch (e) {
        console.log(e)
        customToast({
            message:
                'There was an error updating your milestone. Please refresh and try again',
            type: 'error'
        })
    }
}
