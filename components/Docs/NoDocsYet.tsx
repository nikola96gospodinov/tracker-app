import { Button, Flex, Text } from '@chakra-ui/react'

const NoDocsYet: React.FunctionComponent<{
    docType: string
    onClick: () => void
    size?: 'sm' | 'md'
    customMessage?: string
}> = ({ docType, onClick, size = 'md', customMessage }) => (
    <Flex
        alignItems='center'
        justifyContent='center'
        flexDir='column'
        gap={4}
        py={12}
    >
        <Text fontSize={size === 'md' ? '2xl' : 'xl'}>
            {customMessage
                ? customMessage
                : `No ${docType} yet. 🤔 Let's add some!`}
        </Text>
        <Button size={size} onClick={onClick} mt={size === 'md' ? 2 : 0}>
            Add {docType}
        </Button>
    </Flex>
)

export default NoDocsYet
