import {
    Button,
    Flex,
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

export const Dashboard: FunctionComponent = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].name)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const showButton = activeTab === 'Today' || activeTab === 'This Week'

    return (
        <>
            {showButton && (
                <Flex justifyContent='flex-end' my={-9}>
                    <Button
                        size='sm'
                        boxShadow='none'
                        variant='tertiary'
                        onClick={() => onOpen()}
                    >
                        <GearIcon mr={1} /> Configure
                    </Button>
                </Flex>
            )}
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
                            <Component {...props} onOpen={onOpen} />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>

            <EditActiveHabitsOnDashboard
                type={activeTab === 'Today' ? 'daily' : 'weekly'}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    )
}
