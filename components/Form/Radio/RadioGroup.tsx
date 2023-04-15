import { Radio } from './Radio'

interface Option {
    value: string
    label: string
}

export const RadioGroup: React.FunctionComponent<{
    options: Option[]
    currentValue: string
    name: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    description?: string
}> = ({ description, options, currentValue, name, onChange }) => {
    return (
        <div className='radio-holder'>
            {description && <p>{description} </p>}
            {options.map((option) => (
                <Radio
                    key={option.value}
                    labelText={option.label}
                    value={option.value}
                    name={name}
                    onChange={onChange}
                    checked={currentValue === option.value}
                />
            ))}
        </div>
    )
}
