import Select from 'react-select'

const CustomSelect: React.FunctionComponent<
    React.ComponentProps<typeof Select>
> = (props) => {
    return (
        <Select
            {...props}
            styles={{
                control: (baseStyles) => ({
                    ...baseStyles,
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: '#D9E2EC',
                    boxShadow:
                        'inset 0 3px 3px 0 rgba(0, 0, 0, .16), inset 0 1px 2px 0 rgba(0, 0, 0, .23)',
                    fontSize: '1rem'
                }),
                menu: (baseStyles) => ({
                    ...baseStyles,
                    background: '#D9E2EC'
                }),
                multiValue: (baseStyles) => ({
                    ...baseStyles,
                    background: '#ffffff',
                    borderRadius: '.5rem'
                }),
                multiValueRemove: (baseStyles) => ({
                    ...baseStyles,
                    borderRadius: '.5rem'
                }),
                option: (baseStyles) => ({
                    ...baseStyles,
                    background: '#fff',
                    borderRadius: '.5rem'
                }),
                multiValueLabel: (baseStyles) => ({
                    ...baseStyles,
                    fontSize: '1rem'
                })
            }}
        />
    )
}

export default CustomSelect
