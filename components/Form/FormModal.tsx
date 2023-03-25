import { Dispatch } from '../../typings'
import CloseIcon from '../Icons/CloseIcon'

export const FormModal: React.FunctionComponent<{
    children: React.ReactNode
    setFormOpen: Dispatch<boolean>
}> = ({ children, setFormOpen }) => (
    <div className='backdrop'>
        <div className='form-container'>
            <CloseIcon className='close' onClick={() => setFormOpen(false)} />
            {children}
        </div>
    </div>
)
