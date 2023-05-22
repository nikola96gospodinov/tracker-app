import { FunctionComponent } from 'react'
import { Box, Text } from '@chakra-ui/react'

export const NoFilteredDocs: FunctionComponent<{
    docType: string
}> = ({ docType }) => (
    <Box mt={12} textAlign='center'>
        <Text fontSize='xl'>No {docType} for this filter 🤔</Text>
    </Box>
)
