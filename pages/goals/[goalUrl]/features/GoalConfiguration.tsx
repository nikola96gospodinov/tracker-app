import { useState } from 'react'
import {
    Button,
    Flex,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from '@chakra-ui/react'

import { Goal } from '../../goals.types'
import { tabs } from '../../data'
import GearIcon from '../../../../components/Icons/GearIcon'
import AddIcon from '../../../../components/Icons/AddIcon'

const GoalConfiguration: React.FunctionComponent<{
    goal: Goal
}> = ({ goal }) => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].name)
    const [newElementAdded, setNewElementAdded] = useState(false)

    return (
        <>
            <Flex justifyContent='flex-end' mb={-9}>
                <Button
                    onClick={() => setNewElementAdded(true)}
                    size='sm'
                    boxShadow='none'
                    variant='tertiary'
                >
                    {activeTab === tabs[2].name ? (
                        <AddIcon mr={1} />
                    ) : (
                        <GearIcon mr={1} />
                    )}{' '}
                    {activeTab === tabs[2].name ? 'Add' : 'Configure'}
                </Button>
            </Flex>
            <Tabs colorScheme='purple'>
                <TabList>
                    {tabs.map(({ name }) => (
                        <Tab
                            key={name}
                            onClick={() => {
                                setActiveTab(name)
                                if (name !== activeTab)
                                    setNewElementAdded(false)
                            }}
                            borderBottomWidth={3}
                        >
                            {name}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {tabs.map(({ Component, shortName, props }) => (
                        <TabPanel key={shortName} p={0}>
                            <Component
                                shortName={shortName}
                                goalID={goal.id}
                                newElementAdded={newElementAdded}
                                setNewElementAdded={setNewElementAdded}
                                activeTab={activeTab}
                                goal={goal}
                                {...props}
                            />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </>
    )
}

export default GoalConfiguration
