import {
    Flex,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Menu,
    MenuButton,
    MenuList,
    useDisclosure
} from '@chakra-ui/react'

import { tabs } from '../data'
import { Habit } from '../../../types/habits.types'
import GearIcon from '../../../components/Icons/GearIcon'
import { ChangeKeystoneStatus } from './ChangeKeystoneStatus'
import { ConfigureGoals } from './ConfigureGoals/ConfigureGoals'

export const AdditionalHabitInfo: React.FunctionComponent<{ habit: Habit }> = ({
    habit
}) => {
    const {
        isOpen: isConfigureGoalsOpen,
        onOpen: onConfigureGoalsOpen,
        onClose: onConfigureGoalsClose
    } = useDisclosure()

    return (
        <>
            <Flex justify='flex-end' mb={-9}>
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
                        <ChangeKeystoneStatus habit={habit} />
                        <ConfigureGoals
                            habit={habit}
                            isOpen={isConfigureGoalsOpen}
                            onOpen={onConfigureGoalsOpen}
                            onClose={onConfigureGoalsClose}
                        />
                    </MenuList>
                </Menu>
            </Flex>
            <Tabs colorScheme='purple'>
                <TabList>
                    {tabs.map((tab) => (
                        <Tab key={tab.name}>{tab.name}</Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {tabs.map(({ name, Component }) => (
                        <TabPanel key={name} p={0}>
                            <Component
                                habit={habit}
                                onOpen={onConfigureGoalsOpen}
                            />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </>
    )
}
