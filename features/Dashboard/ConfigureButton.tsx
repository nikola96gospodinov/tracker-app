import { Flex, Menu, MenuButton, Button, MenuList } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

import GearIcon from '../../components/Icons/GearIcon'
import { ImmediateViewMenuItems } from './ImmediateView/ImmediateViewMenuItems'
import { UpcommingMenuItems } from './Upcomming/UpcommingMenuItems'
import { Dispatch } from '../../typings'
import { ActivePeriod } from './data'

export const ConfigureButton: FunctionComponent<{
    activeTab: string
    activePeriod: ActivePeriod
    setActivePeriod: Dispatch<ActivePeriod>
    includeWithNoDeadline: boolean
    setIncludeWithNoDeadline: Dispatch<boolean>
    onOpenAddTodo: () => void
    onOpenHabitList: () => void
}> = ({
    activeTab,
    activePeriod,
    setActivePeriod,
    includeWithNoDeadline,
    setIncludeWithNoDeadline,
    onOpenAddTodo,
    onOpenHabitList
}) => {
    const showImmediateViewActions =
        activeTab === 'Today' || activeTab === 'This Week'

    return (
        <Flex justifyContent='flex-end' my={-9}>
            <Menu>
                <MenuButton
                    as={Button}
                    size='sm'
                    boxShadow='none'
                    variant='tertiary'
                    cursor='pointer'
                >
                    <GearIcon mr={1} transform='translateY(2px)' /> Configure
                </MenuButton>
                <MenuList borderRadius='lg' boxShadow='secondary'>
                    {showImmediateViewActions ? (
                        <ImmediateViewMenuItems
                            onOpenAddTodo={onOpenAddTodo}
                            onOpenHabitList={onOpenHabitList}
                        />
                    ) : (
                        <UpcommingMenuItems
                            activePeriod={activePeriod}
                            setActivePeriod={setActivePeriod}
                            includeWithNoDeadline={includeWithNoDeadline}
                            setIncludeWithNoDeadline={setIncludeWithNoDeadline}
                        />
                    )}
                </MenuList>
            </Menu>
        </Flex>
    )
}
