import {
    Flex,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from '@chakra-ui/react'
import { useContext } from 'react'

import { tabs } from '../../data'
import { Habit } from '../../../habits.types'
import { useGetRelevantGoals } from '../../../../../hooks/useGetRelevantGoals'
import { UserContext } from '../../../../../context/userContext'
import { onKeystoneStatusChange } from '../../../helpers'

export const AdditionalHabitInfo: React.FunctionComponent<{ habit: Habit }> = ({
    habit
}) => {
    const { userId } = useContext(UserContext)
    const { isGoals } = useGetRelevantGoals({
        habitID: habit.id,
        habitType: habit.type
    })

    const buttonText = habit.isKeystone
        ? '- Remove from keystone habits'
        : '+ Add to keystone habits'

    return (
        <>
            {!isGoals && (
                <Flex justify='flex-end' mb={-9}>
                    <Button
                        size='sm'
                        variant='tertiary'
                        onClick={() =>
                            onKeystoneStatusChange({
                                userId,
                                habitId: habit.id,
                                isKeystone: habit.isKeystone
                            })
                        }
                    >
                        {buttonText}
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
