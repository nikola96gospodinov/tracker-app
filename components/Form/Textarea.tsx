export const Textarea: React.FunctionComponent<
    // For some reason there is a type problem with the onChange event
    Omit<React.HTMLProps<HTMLTextAreaElement>, 'onChange'> & {
        labelText: string
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
        isError?: boolean
        error?: string
        otherLabelProps?: React.HTMLProps<HTMLLabelElement>
    }
> = ({
    labelText,
    name,
    value,
    onChange,
    isError,
    error,
    otherLabelProps,
    ...otherTextareaProps
}) => (
    <>
        <label htmlFor={name} {...otherLabelProps}>
            {labelText}
        </label>
        <textarea
            id={name}
            value={value}
            onChange={onChange}
            {...otherTextareaProps}
        />
        {isError && (
            <span className='field-error'>{error ?? 'There is a problem'}</span>
        )}
    </>
)
