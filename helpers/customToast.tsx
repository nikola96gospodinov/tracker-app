import toast, { Toast } from 'react-hot-toast'
import { BsCheckCircleFill } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { MdError } from 'react-icons/md'

const data = {
    success: {
        className: 'success-toast',
        icon: BsCheckCircleFill
    },
    error: {
        className: 'error-toast',
        icon: MdError
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
            <IoClose className='close' onClick={onClose} />
        </div>
    )
}

export const customToast = ({ message, type }: Props) => {
    toast.custom((t) => <SuccessToast t={t} message={message} type={type} />)
}
