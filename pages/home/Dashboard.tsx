import {
    Button,
    Flex,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from '@chakra-ui/react'
import { FunctionComponent } from 'react'

import { tabs } from './data'
import GearIcon from '../../components/Icons/GearIcon'

export const Dashboard: FunctionComponent = () => {
    return (
        <>
            <Flex justifyContent='flex-end' my={-9}>
                <Button size='sm' boxShadow='none' variant='tertiary'>
                    <GearIcon mr={1} /> Configure
                </Button>
            </Flex>
            <Tabs colorScheme='purple'>
                <TabList>
                    <TabList>
                        {tabs.map(({ name }) => (
                            <Tab key={name} borderBottomWidth={3}>
                                {name}
                            </Tab>
                        ))}
                    </TabList>
                </TabList>
                <TabPanels>
                    {tabs.map(({ Component, name, props }) => (
                        <TabPanel key={name} p={0}>
                            <Component {...props} />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </>
    )
}
