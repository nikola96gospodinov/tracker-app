import { MILESTONES } from './../constants'
import { Milestone } from '../goals.types'
import {
    collection,
    deleteDoc,
    doc,
    updateDoc,
    setDoc
} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { Dispatch } from '../../../typings'

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
    } catch (e) {
        console.log(e)
        setSubmitError(true)
    }
}

interface DeleteMilestoneProps {
    userID: string
    milestone: Milestone
    setErrorDeleting: Dispatch<boolean>
}

export const deleteMilestone = async ({
    userID,
    milestone,
    setErrorDeleting
}: DeleteMilestoneProps) => {
    const milestonesCollection = getMilestonesCollection(userID)
    const milestoneRef = doc(milestonesCollection, milestone.id)

    try {
        await deleteDoc(milestoneRef)
        setErrorDeleting(false)
    } catch (e) {
        setErrorDeleting(true)
        console.log(e)
    }
}

interface ToggleMilestoneProps {
    userID: string
    milestone: Milestone
    setErrorToggling: Dispatch<boolean>
}

export const toggleMilestone = async ({
    userID,
    milestone,
    setErrorToggling
}: ToggleMilestoneProps) => {
    const milestonesCollection = getMilestonesCollection(userID)
    const milestonesRef = doc(milestonesCollection, milestone.id)

    try {
        updateDoc(milestonesRef, {
            completed: !milestone.completed
        })
        setErrorToggling(false)
    } catch (e) {
        setErrorToggling(true)
        console.log(e)
    }
}

interface EditMilestoneProps {
    userID: string
    updatedMilestone: Milestone
    setActiveMilestone: Dispatch<Milestone | undefined>
    setErrorUpdating: Dispatch<boolean>
}

export const editMilestone = async ({
    userID,
    updatedMilestone,
    setActiveMilestone,
    setErrorUpdating
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
    } catch (e) {
        console.log(e)
        setErrorUpdating(true)
    }
}
