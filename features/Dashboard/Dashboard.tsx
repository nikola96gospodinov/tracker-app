import {
    Box,
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
    Text,
    useDisclosure
} from '@chakra-ui/react'
import { FunctionComponent, useState } from 'react'

import { ActivePeriod, periods, tabs } from './data'
import GearIcon from '../../components/Icons/GearIcon'
import { EditActiveHabitsOnDashboard } from './EditActiveHabitsOnDashboard'
import { TodoForm } from '../Todos/TodoForm/TodoForm'
import { ImmediateViewMenuItems } from './ImmediateView/ImmediateViewMenuItems'
import { UpcommingMenuItems } from './UpcomingMilestones/UpcommingMenuItems'

export const Dashboard: FunctionComponent = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].name)
    const [activePeriod, setActivePeriod] = useState<ActivePeriod>(
        periods[0].label
    )
    const [includeWithNoDeadline, setIncludeWithNoDeadline] = useState(false)

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

    const showImmediateViewActions =
        activeTab === 'Today' || activeTab === 'This Week'

    return (
        <>
            <Flex justifyContent='flex-end' my={-9}>
                <Menu>
                    <MenuButton
                        as={Button}
                        size='sm'
                        boxShadow='none'
                        variant='tertiary'
                        cursor='pointer'
                    >
                        <GearIcon mr={1} transform='translateY(2px)' />{' '}
                        Configure
                    </MenuButton>
                    <MenuList borderRadius='lg' boxShadow='secondary'>
                        {showImmediateViewActions ? (
                            <ImmediateViewMenuItems
                                onOpenAddTodo={onOpenAddTodo}
                                onOpenHabitList={onOpenHabitList}
                            />
                        ) : (
                            <UpcommingMenuItems
                                activePeriod={activePeriod}
                                setActivePeriod={setActivePeriod}
                                includeWithNoDeadline={includeWithNoDeadline}
                                setIncludeWithNoDeadline={
                                    setIncludeWithNoDeadline
                                }
                            />
                        )}
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
                                {name === periods[0].label
                                    ? activePeriod
                                    : name}
                            </Tab>
                        ))}
                    </TabList>
                </TabList>
                <TabPanels>
                    {tabs.map(({ Component, name, props }) => (
                        <TabPanel key={name} p={0}>
                            <Component
                                {...props}
                                onOpen={onOpenHabitList}
                                activePeriod={activePeriod}
                                includeWithNoDeadline={includeWithNoDeadline}
                            />
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
