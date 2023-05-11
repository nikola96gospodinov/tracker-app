import {
    Textarea as ChakraTextarea,
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    TextareaProps
} from '@chakra-ui/react'
import { ReactNode } from 'react'

export const Textarea: React.FunctionComponent<
    {
        label?: string
        helperText?: string
        isError?: boolean
        errorContent?: ReactNode
    } & TextareaProps
> = ({ label, helperText, isError, errorContent, ...textareaProps }) => {
    const showHelperText = helperText && !isError
    const error = errorContent ?? 'This field is not valid'

    return (
        <FormControl isInvalid={isError}>
            {label && <FormLabel htmlFor={textareaProps.id}>{label}</FormLabel>}
            <ChakraTextarea
                bg='neutral.100'
                boxShadow='inset'
                borderRadius='lg'
                border='none'
                _focus={{
                    boxShadow: 'inset'
                }}
                {...textareaProps}
            />
            {showHelperText && <FormHelperText>{helperText}</FormHelperText>}
            {isError && (
                <FormErrorMessage fontSize='sm' color='red.600'>
                    {error}
                </FormErrorMessage>
            )}
        </FormControl>
    )
}
