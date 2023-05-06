import { Button, Flex, Text } from '@chakra-ui/react'
import { Dispatch } from '../../typings'

const NoDocsYet: React.FunctionComponent<{
    docType: string
    setAddFormOpen: Dispatch<boolean>
}> = ({ docType, setAddFormOpen }) => (
    <Flex
        alignItems='center'
        justifyContent='center'
        flexDir='column'
        gap={4}
        py={8}
    >
        <Text fontSize='2xl'>No {docType} yet. 🤔 Let&apos;s add some!</Text>
        <Button onClick={() => setAddFormOpen(true)}>Add {docType}</Button>
    </Flex>
)

export default NoDocsYet
