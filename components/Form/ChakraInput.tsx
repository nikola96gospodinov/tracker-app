import {
    Input as ChakraInput,
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    InputProps,
    forwardRef
} from '@chakra-ui/react'
import { RefObject, ReactNode } from 'react'

export const Input: React.FunctionComponent<
    {
        label?: string
        helperText?: string
        isError?: boolean
        errorContent?: ReactNode
        ref?: RefObject<HTMLInputElement> // Chakra is using a different ref type
    } & InputProps
> = forwardRef(
    ({ label, helperText, isError, errorContent, ...inputProps }, ref) => {
        const showHelperText = helperText && !isError
        const error = errorContent ?? 'This field is not valid'

        return (
            <FormControl isInvalid={isError}>
                {label && (
                    <FormLabel htmlFor={inputProps.id}>{label}</FormLabel>
                )}
                <ChakraInput
                    bg='neutral.100'
                    boxShadow='inset'
                    borderRadius='lg'
                    border='none'
                    _focus={{
                        boxShadow: 'inset'
                    }}
                    ref={ref}
                    {...inputProps}
                />
                {showHelperText && (
                    <FormHelperText>{helperText}</FormHelperText>
                )}
                {isError && (
                    <FormErrorMessage fontSize='sm' color='red.600'>
                        {error}
                    </FormErrorMessage>
                )}
            </FormControl>
        )
    }
)
