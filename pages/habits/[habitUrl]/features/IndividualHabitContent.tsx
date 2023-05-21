import { useRouter } from 'next/router'
import { useDisclosure } from '@chakra-ui/react'

import DeleteDoc from '../../../../components/Docs/DeleteDoc'
import { Spinner } from '../../../../components/Spinner'
import useGetDoc from '../../../../hooks/useGetDoc'
import { HABIT, HABITS } from '../../constants'
import { Habit } from '../../habits.types'
import HabitForm from '../../features/HabitForm'
import HabitInfo from './HabitInfo'
import { ErrorFetchingDocs } from '../../../../components/Docs/ErrorFetchingDocs'
import { NonExistingDoc } from '../../../../components/Docs/NonExistingDoc'

const IndividualHabitContent = () => {
    const router = useRouter()
    const { habitUrl } = router.query
    const {
        doc: habit,
        loading,
        errorFetching
    } = useGetDoc<Habit>({
        path: HABITS,
        property: 'urlPath',
        value: habitUrl as string
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

    if (errorFetching) return <ErrorFetchingDocs docType={HABIT} />

    if (!habit) return <NonExistingDoc docType={HABIT} />

    return (
        <>
            <HabitInfo
                habit={habit}
                onEditFormOpen={onEditFormOpen}
                onDeleteWarningOpen={onDeleteWarningOpen}
            />
            <HabitForm
                isFormOpen={isEditFormOpen}
                onFormClose={onEditFormClose}
                habit={habit}
            />
            <DeleteDoc
                isDeleteWarningOpen={isDeleteWarningOpen}
                onDeleteWarningClose={onDeleteWarningClose}
                doc={habit}
                path={HABITS}
            />
        </>
    )
}

export default IndividualHabitContent
