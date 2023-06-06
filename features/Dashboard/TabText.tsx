import { FunctionComponent, useContext } from 'react'
import { Text } from '@chakra-ui/react'

import CheckIcon from '../../components/Icons/CheckIcon'
import { TabsNumbersContext } from './context/context'
import { ActivePeriod, periods } from './data'

export const TabText: FunctionComponent<{
    name: string
    value: string
    activePeriod: ActivePeriod
    isActiveTab: boolean
}> = ({ name, value, activePeriod, isActiveTab }) => {
    const isLastTab = name === periods[0].label
    const state = useContext(TabsNumbersContext)
    const num = state[value as keyof typeof state] as number
    const isCompleted = isLastTab
        ? false
        : state[`${value}Completed` as keyof typeof state]
    const showNumber = isLastTab ? true : !isCompleted && num > 0

    return (
        <>
            {isLastTab ? activePeriod : name}{' '}
            {showNumber && (
                <Text
                    ml={1}
                    bg={isActiveTab ? 'purple.50' : 'neutral.100'}
                    borderRadius='50%'
                    color={isActiveTab ? 'purple.900' : 'neutral.900'}
                    h={5}
                    w={5}
                    fontSize='xs'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                >
                    {num > 9 ? '9+' : num}
                </Text>
            )}
            {isCompleted && <CheckIcon ml={1} color='green.600' />}
        </>
    )
}
