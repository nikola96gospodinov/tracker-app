import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

const EmptyContent: React.FunctionComponent<{
    shortName: string
}> = ({ shortName }) => (
    <Flex alignItems='center' justifyContent='center' h={36}>
        <Text fontSize='xl'>
            No {shortName}... You can add some by pressing &apos;
            <b>Configure</b>
            &apos;! 😌
        </Text>
    </Flex>
)

export default EmptyContent
