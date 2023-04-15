export const Input: React.FunctionComponent<
    // For some reason there is a type problem with the onChange event
    Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
        labelText: string
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
        isError?: boolean
        error?: string
        otherLabelProps?: React.HTMLProps<HTMLLabelElement>
    }
> = ({
    labelText,
    name,
    value,
    type,
    onChange,
    isError,
    error,
    otherLabelProps,
    ...otherInputProps
}) => (
    <>
        <label htmlFor={name} {...otherLabelProps}>
            {labelText}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            {...otherInputProps}
        />
        {isError && (
            <span className='field-error'>{error ?? 'There is a problem'}</span>
        )}
    </>
)
