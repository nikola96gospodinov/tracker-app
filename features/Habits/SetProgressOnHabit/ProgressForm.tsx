import { FormModal } from '../../../components/Form/FormModal'
import { Dispatch } from '../../../typings'

export const ProgressForm: React.FunctionComponent<{
    progressFormOpen: boolean
    setProgressFormOpen: Dispatch<boolean>
    progress: number
}> = ({ progressFormOpen, setProgressFormOpen, progress }) => {
    return (
        <>
            {progressFormOpen && (
                <FormModal setFormOpen={setProgressFormOpen}>
                    <></>
                </FormModal>
            )}
        </>
    )
}
