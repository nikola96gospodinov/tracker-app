import {
    FormControl,
    FormLabel,
    Select as ChakraSelect,
    SelectProps,
    FormErrorMessage,
    FormHelperText
} from '@chakra-ui/react'
import { capitalizeFirstLetter } from '../../helpers/string-manipulation-functions'

export interface Option {
    value: string
    label: string
}

export interface Options {
    [key: string]: Option[]
}

export const Select: React.FunctionComponent<
    {
        label?: string
        helperText?: string
        isError?: boolean
        errorContent?: React.ReactNode
        options: Options | Option[]
        activeOptionValue?: string
    } & SelectProps
> = ({
    options,
    label,
    helperText,
    isError,
    errorContent,
    activeOptionValue,
    ...inputProps
}) => {
    const noOptGroups = Array.isArray(options)
    const showHelperText = helperText && !isError
    const error = errorContent ?? 'This field is not valid'

    return (
        <FormControl>
            {label && <FormLabel htmlFor={inputProps.id}>{label}</FormLabel>}
            <ChakraSelect
                bg='neutral.100'
                boxShadow='inset'
                borderRadius='lg'
                border='none'
                _focus={{
                    boxShadow: 'inset'
                }}
                {...inputProps}
            >
                <option
                    value=''
                    disabled
                    selected={activeOptionValue === undefined}
                    style={{ opacity: 0.5 }}
                ></option>
                {noOptGroups
                    ? options.map(({ value, label }) => (
                          <option
                              key={value}
                              value={value}
                              selected={value === activeOptionValue}
                          >
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
            </ChakraSelect>
            {showHelperText && <FormHelperText>{helperText}</FormHelperText>}
            {isError && (
                <FormErrorMessage fontSize='sm' color='red.600'>
                    {error}
                </FormErrorMessage>
            )}
        </FormControl>
    )
}
