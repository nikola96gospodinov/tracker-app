import {
    Input as ChakraInput,
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    InputProps
} from '@chakra-ui/react'

export const Input: React.FunctionComponent<
    {
        label?: string
        helperText?: string
        isError?: boolean
        errorText?: string
    } & InputProps
> = ({ label, helperText, isError, errorText, ...inputProps }) => {
    const showHelperText = helperText && !isError
    const showErrorText = errorText && isError

    return (
        <FormControl>
            {label && <FormLabel htmlFor={inputProps.id}>{label}</FormLabel>}
            <ChakraInput
                bg='neutral.100'
                boxShadow='inset'
                borderRadius='lg'
                border='none'
                _focus={{
                    boxShadow: 'inset'
                }}
                {...inputProps}
            />
            {showHelperText && <FormHelperText>{helperText}</FormHelperText>}
            {showErrorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
        </FormControl>
    )
}
