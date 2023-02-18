import { AiFillCloseCircle } from 'react-icons/ai'

import { Dispatch } from '../../typings'

export const FormModal: React.FunctionComponent<{
    children: React.ReactNode
    setFormOpen: Dispatch<boolean>
}> = ({ children, setFormOpen }) => (
    <div className='backdrop'>
        <div className='form-container'>
            <AiFillCloseCircle
                className='close'
                onClick={() => setFormOpen(false)}
            />
            {children}
        </div>
    </div>
)
