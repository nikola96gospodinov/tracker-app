import { Flex, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

import { Link } from '../UIElements/Link'

export const NonExistingDoc: FunctionComponent<{
    docType: string
}> = ({ docType }) => {
    return (
        <Flex
            alignItems='center'
            justifyContent='center'
            flexDir='column'
            gap={6}
            py={8}
        >
            <Text fontSize='2xl'>
                The {docType} you&apos;re looking for doesn&apos;t exist... 😨
            </Text>
            <Link href='/'>Back to dashboard</Link>
        </Flex>
    )
}
