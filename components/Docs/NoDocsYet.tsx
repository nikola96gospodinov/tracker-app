import { Button, Flex, Text } from '@chakra-ui/react'

const NoDocsYet: React.FunctionComponent<{
    docType: string
    onClick: () => void
}> = ({ docType, onClick }) => (
    <Flex
        alignItems='center'
        justifyContent='center'
        flexDir='column'
        gap={4}
        py={8}
    >
        <Text fontSize='2xl'>No {docType} yet. 🤔 Let&apos;s add some!</Text>
        <Button onClick={onClick}>Add {docType}</Button>
    </Flex>
)

export default NoDocsYet
