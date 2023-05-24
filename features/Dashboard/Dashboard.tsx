import {
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useDisclosure
} from '@chakra-ui/react'
import { FunctionComponent, useState } from 'react'

import { tabs } from './data'
import GearIcon from '../../components/Icons/GearIcon'
import { EditActiveHabitsOnDashboard } from './EditActiveHabitsOnDashboard'
import { TodoForm } from '../Todos/TodoForm/TodoForm'

export const Dashboard: FunctionComponent = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].name)
    const {
        isOpen: isOpenHabitList,
        onOpen: onOpenHabitList,
        onClose: onCloseHabitList
    } = useDisclosure()

    const {
        isOpen: isOpenAddTodo,
        onOpen: onOpenAddTodo,
        onClose: onCloseAddTodo
    } = useDisclosure()

    const showButton = activeTab === 'Today' || activeTab === 'This Week'

    return (
        <>
            <Flex justifyContent='flex-end' my={-9}>
                <Menu>
                    <MenuButton
                        as={Button}
                        size='sm'
                        boxShadow='none'
                        variant='tertiary'
                        opacity={showButton ? 1 : 0}
                        cursor={showButton ? 'pointer' : 'default'}
                    >
                        <GearIcon mr={1} /> Configure
                    </MenuButton>
                    <MenuList borderRadius='lg' boxShadow='secondary'>
                        <MenuItem
                            onClick={() => {
                                if (showButton) onOpenHabitList()
                            }}
                        >
                            Manage active habits
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                if (showButton) onOpenAddTodo()
                            }}
                        >
                            Add a todo
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <Tabs colorScheme='purple'>
                <TabList>
                    <TabList>
                        {tabs.map(({ name }) => (
                            <Tab
                                key={name}
                                borderBottomWidth={3}
                                onClick={() => setActiveTab(name)}
                            >
                                {name}
                            </Tab>
                        ))}
                    </TabList>
                </TabList>
                <TabPanels>
                    {tabs.map(({ Component, name, props }) => (
                        <TabPanel key={name} p={0}>
                            <Component {...props} onOpen={onOpenHabitList} />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>

            <EditActiveHabitsOnDashboard
                type={activeTab === 'Today' ? 'daily' : 'weekly'}
                isOpen={isOpenHabitList}
                onClose={onCloseHabitList}
            />

            <TodoForm isFormOpen={isOpenAddTodo} onFormClose={onCloseAddTodo} />
        </>
    )
}
