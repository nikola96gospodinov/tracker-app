import { Flex, Text } from '@chakra-ui/react'

import ErrorIcon from '../Icons/ErrorIcon'

export const FormError: React.FunctionComponent<{
    formError: boolean
    errorText?: string
}> = ({ formError, errorText }) => {
    const error = errorText ?? ' There was an issue submitting the form'

    return (
        <>
            {formError && (
                <Flex
                    my={4}
                    alignItems='center'
                    justifyContent='center'
                    bg='red.50'
                    p={4}
                    borderRadius='lg'
                    border='.1rem solid'
                    borderColor='red.600'
                    gap={2}
                >
                    <ErrorIcon boxSize={8} color='red.600' />
                    <Text color='red.600'>{error}</Text>
                </Flex>
            )}
        </>
    )
}
