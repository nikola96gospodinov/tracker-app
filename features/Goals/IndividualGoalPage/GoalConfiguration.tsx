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

import { Goal } from '../goals.types'
import { tabs } from '../data'

const GoalConfiguration: React.FunctionComponent<{
    goal: Goal
}> = ({ goal }) => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].name)
    const [newElementAdded, setNewElementAdded] = useState(false)

    return (
        <>
            <Flex justifyContent='flex-end' mb={-9}>
                <Button
                    height='auto'
                    py={2}
                    px={4}
                    mt={8}
                    mr={1}
                    onClick={() => setNewElementAdded(true)}
                    boxShadow='none'
                    fontSize='md'
                >
                    Add +
                </Button>
            </Flex>
            <Tabs colorScheme='purple'>
                <TabList>
                    {tabs.map((tab, key) => (
                        <Tab
                            key={key}
                            onClick={() => {
                                setActiveTab(tab.name)
                                if (tab.name !== activeTab)
                                    setNewElementAdded(false)
                            }}
                            borderBottomWidth={3}
                        >
                            {tab.name}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels mt={-4}>
                    {tabs.map(({ Component, shortName }, key) => (
                        <TabPanel key={key}>
                            <Component
                                key={key}
                                shortName={shortName}
                                goalID={goal.id}
                                newElementAdded={newElementAdded}
                                setNewElementAdded={setNewElementAdded}
                                activeTab={activeTab}
                                goal={goal}
                            />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </>
    )
}

export default GoalConfiguration
