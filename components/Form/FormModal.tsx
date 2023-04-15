import { ErrorIcon } from 'react-hot-toast'
import { Dispatch } from '../../typings'
import CloseIcon from '../Icons/CloseIcon'

export const FormModal: React.FunctionComponent<{
    children: React.ReactNode
    setFormOpen: Dispatch<boolean>
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    title?: string
    isFormError?: boolean
    formError?: string
}> = ({ children, setFormOpen, onSubmit, title, isFormError, formError }) => (
    <div className='backdrop'>
        <div className='form-container'>
            <CloseIcon className='close' onClick={() => setFormOpen(false)} />
            {title && <h1>{title}</h1>}
            <form onSubmit={(e) => onSubmit(e)}>{children}</form>
            {isFormError && (
                <div className='form-error'>
                    <ErrorIcon />
                    <span>
                        {formError ?? 'There was an error submitting the form'}
                    </span>
                </div>
            )}
        </div>
    </div>
)
