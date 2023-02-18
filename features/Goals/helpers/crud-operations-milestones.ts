import { Milestone } from '../goals.types'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { Dispatch } from '../../../typings'

const milestonesCollection = collection(db, 'milestones')

interface AddMilestoneProps {
    userID: string
    milestones: Milestone[]
    newMilestone: Milestone
    setSubmitError: Dispatch<boolean>
}

export const addMilestone = async ({
    userID,
    milestones,
    newMilestone,
    setSubmitError
}: AddMilestoneProps) => {
    const milestonesRef = doc(milestonesCollection, userID)

    try {
        setDoc(
            milestonesRef,
            { data: [...milestones, newMilestone] },
            { merge: true }
        )
        setSubmitError(false)
    } catch (e) {
        console.log(e)
        setSubmitError(true)
    }
}

interface DeleteMilestoneProps {
    userID: string
    milestones: Milestone[]
    milestone: Milestone
    setErrorDeleting: Dispatch<boolean>
}

export const deleteMilestone = async ({
    userID,
    milestones,
    milestone,
    setErrorDeleting
}: DeleteMilestoneProps) => {
    const milestonesRef = doc(milestonesCollection, userID)

    try {
        setDoc(milestonesRef, {
            data: [...milestones.filter((m) => milestone?.id !== m.id)]
        })
        setErrorDeleting(false)
    } catch (e) {
        setErrorDeleting(true)
        console.log(e)
    }
}

interface ToggleMilestoneProps {
    userID: string
    milestones: Milestone[]
    milestone: Milestone
    setErrorToggling: Dispatch<boolean>
}

export const toggleMilestone = async ({
    userID,
    milestones,
    milestone,
    setErrorToggling
}: ToggleMilestoneProps) => {
    const milestonesRef = doc(milestonesCollection, userID)

    const toggledMilestone = {
        ...milestone,
        completed: !milestone.completed
    } as Milestone

    try {
        setDoc(milestonesRef, {
            data: [
                ...milestones.filter((m) => milestone?.id !== m.id),
                toggledMilestone
            ]
        })
        setErrorToggling(false)
    } catch (e) {
        setErrorToggling(true)
        console.log(e)
    }
}

interface EditMilestoneProps {
    userID: string
    milestones: Milestone[]
    updatedMilestone: Milestone
    setActiveMilestone: Dispatch<Milestone | undefined>
    setErrorUpdating: Dispatch<boolean>
}

export const editMilestone = async ({
    userID,
    milestones,
    updatedMilestone,
    setActiveMilestone,
    setErrorUpdating
}: EditMilestoneProps) => {
    const milestonesRef = doc(milestonesCollection, userID)

    try {
        setDoc(
            milestonesRef,
            {
                data: [
                    ...milestones.filter((g) => updatedMilestone?.id !== g.id),
                    updatedMilestone
                ]
            },
            { merge: true }
        )
        setActiveMilestone(undefined)
    } catch (e) {
        console.log(e)
        setErrorUpdating(true)
    }
}
