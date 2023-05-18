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

const smStyles = {
    py: 0.5,
    px: 2,
    height: 'auto',
    fontSize: 'sm'
}

export const Input: React.FunctionComponent<
    {
        label?: string
        helperText?: string
        isError?: boolean
        errorContent?: ReactNode
        ref?: RefObject<HTMLInputElement> // Chakra is using a different ref type
        isSmall?: boolean
    } & InputProps
> = forwardRef(
    (
        { label, helperText, isError, errorContent, isSmall, ...inputProps },
        ref
    ) => {
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
                    {...(isSmall ? smStyles : {})}
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
