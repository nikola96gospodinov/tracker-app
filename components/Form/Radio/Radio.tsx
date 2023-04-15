export const Radio: React.FunctionComponent<{
    labelText: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    checked: boolean
}> = ({ labelText, name, value, onChange, checked }) => (
    <label>
        <input
            type='radio'
            id={value}
            name={name}
            value={value}
            onChange={onChange}
            checked={checked}
        />
        {labelText}
    </label>
)
