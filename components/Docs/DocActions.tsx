import { Flex } from '@chakra-ui/react'

import DeleteIcon from '../Icons/DeleteIcon'
import EditIcon from '../Icons/EditIcon'

export const DocActions: React.FunctionComponent<{
    editAction: () => void
    deleteAction: () => void
}> = ({ editAction, deleteAction }) => {
    return (
        <Flex alignItems='center'>
            <EditIcon
                onClick={editAction}
                boxSize={10}
                transition='0.2s ease'
                cursor='pointer'
                color='yellow.900'
                bg='yellow.50'
                borderRadius='50%'
                boxShadow='inset'
                p={2.5}
                _hover={{
                    transform: 'scale(1.05)',
                    color: 'yellow.800'
                }}
            />
            <DeleteIcon
                onClick={deleteAction}
                boxSize={10}
                transition='0.2s ease'
                cursor='pointer'
                color='red.900'
                bg='red.50'
                borderRadius='50%'
                boxShadow='inset'
                p={2.5}
                ml={3}
                _hover={{
                    transform: 'scale(1.05)',
                    color: 'red.800'
                }}
            />
        </Flex>
    )
}
