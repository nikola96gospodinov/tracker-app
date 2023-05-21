import { useState } from 'react'
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

import { Goal } from '../../types/goals.types'
import { tabs } from './data'
import GearIcon from '../../components/Icons/GearIcon'
import AddIcon from '../../components/Icons/AddIcon'
import {
    DAILY_HABITS_CAPITALIZED,
    MILESTONES_CAPITALIZED
} from '../../constants/goalsConstants'
import { EditActiveHabitsForAGoal } from './EditActiveHabitsForAGoal'

const GoalConfiguration: React.FunctionComponent<{
    goal: Goal
}> = ({ goal }) => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].name)
    const [newElementAdded, setNewElementAdded] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onButtonClick = () => {
        if (activeTab === MILESTONES_CAPITALIZED) {
            setNewElementAdded(true)
        } else {
            onOpen()
        }
    }

    return (
        <>
            <Flex justifyContent='flex-end' mb={-9}>
                <Button
                    onClick={onButtonClick}
                    size='sm'
                    boxShadow='none'
                    variant='tertiary'
                >
                    {activeTab === MILESTONES_CAPITALIZED ? (
                        <AddIcon mr={1} />
                    ) : (
                        <GearIcon mr={1} />
                    )}{' '}
                    {activeTab === MILESTONES_CAPITALIZED ? 'Add' : 'Configure'}
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

            <EditActiveHabitsForAGoal
                type={
                    activeTab === DAILY_HABITS_CAPITALIZED ? 'daily' : 'weekly'
                }
                isOpen={isOpen}
                onClose={onClose}
                goal={goal}
            />
        </>
    )
}

export default GoalConfiguration
