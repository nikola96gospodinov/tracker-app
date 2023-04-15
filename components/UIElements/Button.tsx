import Spinner from './spinner'

type BtnClass =
    | 'button-primary'
    | 'button-secondary'
    | 'button-tertiary'
    | 'button-delete'
    | 'button-link'
    | 'button-disabled'

export const Button: React.FunctionComponent<
    React.HTMLProps<HTMLButtonElement> & {
        text: string
        btnClass: BtnClass
        type: 'button' | 'submit' | 'reset' | undefined
        isLoading?: boolean
    }
> = ({ text, btnClass, isLoading, ...args }) => {
    const buttonContent = isLoading ? (
        <Spinner size={1.5} isText={false} />
    ) : (
        text
    )

    const buttonSecondClass = isLoading ? 'button-disabled' : btnClass

    return (
        <button
            {...args}
            className={`button ${buttonSecondClass} ${args.className}`}
        >
            {buttonContent}
        </button>
    )
}
