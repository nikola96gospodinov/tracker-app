import { Button, Flex, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { useRouter } from 'next/router'

export const ErrorFetchingDocs: FunctionComponent<{
    docType: string
}> = ({ docType }) => {
    const router = useRouter()

    return (
        <Flex
            alignItems='center'
            justifyContent='center'
            flexDir='column'
            gap={4}
            py={8}
        >
            <Text fontSize='2xl'>
                Oh no... 😨 There was an error fetching your {docType}...
            </Text>
            <Button onClick={() => router.reload()}>Refresh Page</Button>
        </Flex>
    )
}
