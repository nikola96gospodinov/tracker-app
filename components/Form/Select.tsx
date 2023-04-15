import { capitalizeFirstLetter } from '../../helpers/string-manipulation-functions'

interface Option {
    value: string
    label: string
}

interface Options {
    [key: string]: Option[]
}

export const Select: React.FunctionComponent<{
    labelText: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    isError?: boolean
    error?: string
    options: Options | Option[]
}> = ({ labelText, name, value, onChange, isError, error, options }) => {
    const noOptGroups = Array.isArray(options)

    return (
        <>
            <label htmlFor={name}>{labelText}</label>
            <select id={name} value={value} onChange={onChange}>
                <option
                    value=''
                    disabled
                    selected
                    style={{ opacity: 0.5 }}
                ></option>
                {noOptGroups
                    ? options.map(({ value, label }) => (
                          <option key={value} value={value}>
                              {label}
                          </option>
                      ))
                    : Object.keys(options).map((key) => (
                          <optgroup
                              key={key}
                              label={capitalizeFirstLetter(key)}
                          >
                              {options[key].map(({ value, label }) => (
                                  <option key={value} value={value}>
                                      {label}
                                  </option>
                              ))}
                          </optgroup>
                      ))}
                <option value='' disabled style={{ opacity: 0.5 }}></option>
            </select>
            {isError && (
                <span className='field-error'>
                    {error ?? 'There is a problem'}
                </span>
            )}
        </>
    )
}
