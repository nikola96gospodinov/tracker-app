import { useRouter } from 'next/router'
import { useDisclosure } from '@chakra-ui/react'

import GoalInfo from './GoalInfo'
import { Spinner } from '../../components/UIElements/Spinner'
import GoalForm from '../Goals/GoalForm/GoalForm'
import GoalConfiguration from './GoalConfiguration'
import { Goal } from '../../types/goals.types'
import { GOAL, GOALS } from '../../constants/goalsConstants'
import DeleteDoc from '../../components/Docs/DeleteDoc'
import useGetDoc from '../../hooks/useGetDoc'
import { ErrorFetchingDocs } from '../../components/Docs/ErrorFetchingDocs'
import { NonExistingDoc } from '../../components/Docs/NonExistingDoc'

const IndividualGoalContent = () => {
    const router = useRouter()
    const { goalUrl } = router.query
    const {
        doc: goal,
        loading,
        errorFetching
    } = useGetDoc<Goal>({
        path: GOALS,
        property: 'urlPath',
        value: goalUrl as string
    })
    const {
        isOpen: isEditFormOpen,
        onOpen: onEditFormOpen,
        onClose: onEditFormClose
    } = useDisclosure()
    const {
        isOpen: isDeleteWarningOpen,
        onOpen: onDeleteWarningOpen,
        onClose: onDeleteWarningClose
    } = useDisclosure()

    if (loading) return <Spinner text='Loading...' />

    if (errorFetching) return <ErrorFetchingDocs docType={GOAL} />

    if (!goal) return <NonExistingDoc docType={GOAL} />

    return (
        <>
            <GoalInfo
                goal={goal}
                onEditFormOpen={onEditFormOpen}
                onDeleteWarningOpen={onDeleteWarningOpen}
            />
            <GoalForm
                isFormOpen={isEditFormOpen}
                onFormClose={onEditFormClose}
                goal={goal}
            />
            <DeleteDoc
                isDeleteWarningOpen={isDeleteWarningOpen}
                onDeleteWarningClose={onDeleteWarningClose}
                doc={goal}
                path={GOALS}
                toastSuccessMessage='Goal successfully deleted'
                toastErrorMessage='There was an error deleting your goal. Please try again'
            />
            <GoalConfiguration goal={goal} />
        </>
    )
}

export default IndividualGoalContent
