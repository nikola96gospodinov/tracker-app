import {
    Flex,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from '@chakra-ui/react'

import { tabs } from '../../data'
import { Habit } from '../../../habits.types'
import { useGetRelevantGoals } from '../../../../../hooks/useGetRelevantGoals'

export const AdditionalHabitInfo: React.FunctionComponent<{ habit: Habit }> = ({
    habit
}) => {
    const { isGoals } = useGetRelevantGoals({
        habitID: habit.id,
        habitType: habit.type
    })

    return (
        <>
            {!isGoals && (
                <Flex justify='flex-end' mb={-9}>
                    <Button size='sm' boxShadow='none'>
                        + Add as a keystone habit
                    </Button>
                </Flex>
            )}
            <Tabs colorScheme='purple' mt={isGoals ? 8 : 0}>
                <TabList>
                    {tabs.map((tab) => (
                        <Tab key={tab.name}>{tab.name}</Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {tabs.map(({ name, Component }) => (
                        <TabPanel key={name} p={0}>
                            <Component habit={habit} />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </>
    )
}
