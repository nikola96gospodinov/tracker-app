import { Button, Flex, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { useRouter } from 'next/router'

export const ErrorFetchingDocs: FunctionComponent<{
    docType: string
    size?: 'sm' | 'md'
}> = ({ docType, size = 'md' }) => {
    const router = useRouter()

    return (
        <Flex
            alignItems='center'
            justifyContent='center'
            flexDir='column'
            gap={4}
            py={12}
        >
            <Text fontSize={size === 'md' ? '2xl' : 'xl'}>
                Oh no... 😨 There was an error fetching your {docType}...
            </Text>
            <Button
                size={size}
                onClick={() => router.reload()}
                mt={size === 'md' ? 2 : 0}
            >
                Refresh Page
            </Button>
        </Flex>
    )
}
