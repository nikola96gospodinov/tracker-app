import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    Text,
    Flex,
    HStack,
    useDisclosure,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList
} from '@chakra-ui/react'
import { FunctionComponent } from 'react'

import GearIcon from '../../../components/Icons/GearIcon'
import { Todo } from '../../../types/todos.types'
import EditIcon from '../../../components/Icons/EditIcon'
import DeleteIcon from '../../../components/Icons/DeleteIcon'
import DeleteDoc from '../../../components/Docs/DeleteDoc'
import { TODOS } from '../../../constants/todoConstants'
import { TodoForm } from '../TodoForm/TodoForm'

export const TodoActions: FunctionComponent<{
    todo: Todo
}> = ({ todo }) => {
    const {
        isOpen: isEditFormOpen,
        onOpen: onEditFormOpen,
        onClose: onEditFormClose
    } = useDisclosure()
    const {
        isOpen: isDeleteWarningOpen,
        onOpen: onDeleteWarningOpen,
        onClose: onDeleteWarningClose
    } = useDisclosure()

    return (
        <>
            <Menu>
                <MenuButton as={Text} cursor='pointer'>
                    <GearIcon />
                </MenuButton>
                <MenuList borderRadius='lg' boxShadow='secondary'>
                    <MenuItem
                        display='flex'
                        alignItems='center'
                        gap={2}
                        _hover={{
                            bg: 'yellow.50',
                            color: 'yellow.900'
                        }}
                        onClick={() => onEditFormOpen()}
                    >
                        <EditIcon /> Edit
                    </MenuItem>
                    <MenuItem
                        display='flex'
                        alignItems='center'
                        gap={2}
                        _hover={{
                            bg: 'red.50',
                            color: 'red.900'
                        }}
                        onClick={() => onDeleteWarningOpen()}
                    >
                        <DeleteIcon /> Delete
                    </MenuItem>
                </MenuList>
            </Menu>
            <TodoForm
                isFormOpen={isEditFormOpen}
                onFormClose={onEditFormClose}
                todo={todo}
            />
            <DeleteDoc
                isDeleteWarningOpen={isDeleteWarningOpen}
                onDeleteWarningClose={onDeleteWarningClose}
                doc={todo}
                path={TODOS}
                noRedirect
            />
        </>
    )
}
