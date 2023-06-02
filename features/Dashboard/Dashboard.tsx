import { useDisclosure } from '@chakra-ui/react'
import { FunctionComponent, useState } from 'react'

import { ActivePeriod, periods, tabs } from './data'
import { EditActiveHabitsOnDashboard } from './EditActiveHabitsOnDashboard'
import { TodoForm } from '../Todos/TodoForm/TodoForm'
import { ConfigureButton } from './ConfigureButton'
import { DashboardTabs } from './DashboardTabs'

export const Dashboard: FunctionComponent = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].name)
    const [activePeriod, setActivePeriod] = useState<ActivePeriod>(
        periods[0].label
    )
    const [includeWithNoDeadline, setIncludeWithNoDeadline] = useState(false)

    const {
        isOpen: isOpenHabitList,
        onOpen: onOpenHabitList,
        onClose: onCloseHabitList
    } = useDisclosure()

    const {
        isOpen: isOpenAddTodo,
        onOpen: onOpenAddTodo,
        onClose: onCloseAddTodo
    } = useDisclosure()

    return (
        <>
            <ConfigureButton
                activeTab={activeTab}
                activePeriod={activePeriod}
                setActivePeriod={setActivePeriod}
                includeWithNoDeadline={includeWithNoDeadline}
                setIncludeWithNoDeadline={setIncludeWithNoDeadline}
                onOpenAddTodo={onOpenAddTodo}
                onOpenHabitList={onOpenHabitList}
            />

            <DashboardTabs
                setActiveTab={setActiveTab}
                activePeriod={activePeriod}
                onOpenHabitList={onOpenHabitList}
                includeWithNoDeadline={includeWithNoDeadline}
            />

            <EditActiveHabitsOnDashboard
                type={activeTab === 'Today' ? 'daily' : 'weekly'}
                isOpen={isOpenHabitList}
                onClose={onCloseHabitList}
            />

            <TodoForm isFormOpen={isOpenAddTodo} onFormClose={onCloseAddTodo} />
        </>
    )
}
