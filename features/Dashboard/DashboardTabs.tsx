import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { tabs, periods, ActivePeriod } from './data'
import { Dispatch } from '../../typings'

export const DashboardTabs: FunctionComponent<{
    setActiveTab: Dispatch<string>
    activePeriod: ActivePeriod
    onOpenHabitList: () => void
    includeWithNoDeadline: boolean
}> = ({
    setActiveTab,
    activePeriod,
    onOpenHabitList,
    includeWithNoDeadline
}) => (
    <Tabs colorScheme='purple'>
        <TabList>
            <TabList>
                {tabs.map(({ name }) => (
                    <Tab
                        key={name}
                        borderBottomWidth={3}
                        onClick={() => setActiveTab(name)}
                    >
                        {name === periods[0].label ? activePeriod : name}
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
)
