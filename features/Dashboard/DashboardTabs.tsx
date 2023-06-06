import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

import { tabs, ActivePeriod } from './data'
import { Dispatch } from '../../typings'
import { TabText } from './TabText'

export const DashboardTabs: FunctionComponent<{
    activeTab: string
    setActiveTab: Dispatch<string>
    activePeriod: ActivePeriod
    onOpenHabitList: () => void
    includeWithNoDeadline: boolean
}> = ({
    activeTab,
    setActiveTab,
    activePeriod,
    onOpenHabitList,
    includeWithNoDeadline
}) => (
    <Tabs colorScheme='purple'>
        <TabList>
            <TabList>
                {tabs.map(({ name, value }) => {
                    const isActiveTab = activeTab === name
                    return (
                        <Tab
                            key={name}
                            borderBottomWidth={3}
                            onClick={() => setActiveTab(name)}
                        >
                            <TabText
                                name={name}
                                value={value}
                                isActiveTab={isActiveTab}
                                activePeriod={activePeriod}
                            />
                        </Tab>
                    )
                })}
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
