import { MdErrorOutline } from 'react-icons/md'

export const Errors: React.FunctionComponent<{
    errorDeleting: boolean
    errorToggling: boolean
    errorUpdating: boolean
}> = ({ errorDeleting, errorToggling, errorUpdating }) => (
    <>
        {errorDeleting && (
            <div className='form-error'>
                <MdErrorOutline />
                <span>
                    There was an error deleting the milestone. Please try again
                </span>
            </div>
        )}
        {errorToggling && (
            <div className='form-error'>
                <MdErrorOutline />
                <span>
                    There was an error changing the milestone. Please try again
                </span>
            </div>
        )}
        {errorUpdating && (
            <div className='form-error'>
                <MdErrorOutline />
                <span>
                    There was an error updating the milestone. Please try again
                </span>
            </div>
        )}
    </>
)
