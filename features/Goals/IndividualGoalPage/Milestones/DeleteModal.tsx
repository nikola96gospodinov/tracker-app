import { FormModal } from '../../../../components/Form/FormModal'
import { Milestone } from '../../goals.types'
import { Dispatch } from '../../../../typings'
import { Button } from '../../../../components/UIElements/Button'

export const DeleteModal: React.FunctionComponent<{
    handleDelete: () => void
    setDeleteWarning: Dispatch<boolean>
    setActiveMilestone: Dispatch<Milestone | undefined>
}> = ({ handleDelete, setDeleteWarning, setActiveMilestone }) => (
    <FormModal setFormOpen={setDeleteWarning}>
        <p style={{ fontSize: '1.125rem', textAlign: 'center' }}>
            Are you sure you want to <b>delete</b> the milestone?
        </p>
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                gridGap: '1rem',
                marginTop: '2rem'
            }}
        >
            <Button
                type='button'
                btnClass='button-delete'
                onClick={handleDelete}
                text='Delete'
            />
            <Button
                type='button'
                btnClass='button-tertiary'
                onClick={() => {
                    setDeleteWarning(false)
                    setActiveMilestone(undefined)
                }}
                text='Cancel'
            />
        </div>
    </FormModal>
)
