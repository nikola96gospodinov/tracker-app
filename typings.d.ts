export type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

export type HTMLInputWithoutType = Omit<
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
    'type'
>

export type HTMLInputWithoutTypeAndName = Omit<
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
    'type' | 'name'
>
