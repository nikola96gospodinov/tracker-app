import Spinner from './spinner'

type BtnClass =
    | 'button-primary'
    | 'button-secondary'
    | 'button-tertiary'
    | 'button-delete'
    | 'button-link'

export const Button: React.FunctionComponent<
    React.HTMLProps<HTMLButtonElement> & {
        text: string
        btnClass: BtnClass
        type: 'button' | 'submit' | 'reset' | undefined
        isLoading?: boolean
    }
> = ({ text, btnClass, isLoading, ...props }) => {
    const buttonContent = isLoading ? (
        <Spinner size={1.5} isText={false} />
    ) : (
        text
    )

    const buttonSecondClass = isLoading ? 'button-disabled' : btnClass

    return (
        <button className={`button ${buttonSecondClass}`} {...props}>
            {buttonContent}
        </button>
    )
}
