import toast, { Toast } from 'react-hot-toast'
import CheckIcon from '../components/Icons/CheckIcon'
import CloseIcon from '../components/Icons/CloseIcon'
import DangerIcon from '../components/Icons/DangerIcon'

const data = {
    success: {
        className: 'success-toast',
        icon: CheckIcon
    },
    error: {
        className: 'error-toast',
        icon: DangerIcon
    }
}

interface Props {
    message: string
    type: 'success' | 'error'
}

interface ToastElementProps extends Props {
    t: Toast
}

const SuccessToast = ({ t, message, type }: ToastElementProps) => {
    const Icon = data[type].icon
    const extraClass = data[type].className
    const animationClass = t.visible ? 'enter-toast' : 'leave-toast'

    const onClose = () => {
        toast.dismiss(t.id)
    }

    return (
        <div className={`toast ${extraClass} ${animationClass}`}>
            <Icon />
            <p>{message}</p>
            <CloseIcon className='close' onClick={onClose} />
        </div>
    )
}

export const customToast = ({ message, type }: Props) => {
    toast.custom((t) => <SuccessToast t={t} message={message} type={type} />)
}
