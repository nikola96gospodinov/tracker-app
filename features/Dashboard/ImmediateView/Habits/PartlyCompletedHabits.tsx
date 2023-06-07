import { FunctionComponent } from 'react'
import {
    Flex,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    Text
} from '@chakra-ui/react'

import { HabitType } from '../../../../types/habits.types'
import { useGetAllActiveHabitsByType } from '../../../../hooks/useGetAllActiveHabitsByType'
import { today } from '../../../../helpers/date-manipulation-functions'
import CheckIcon from '../../../../components/Icons/CheckIcon'
import GearIcon from '../../../../components/Icons/GearIcon'
import { UpdateHabitMetrics } from '../../../UpdateMetrics/UpdateHabitMetrics/UpdateHabitMetrics'
import { Link } from '../../../../components/UIElements/Link'
import ChevronUpIcon from '../../../../components/Icons/ChevronUpIcon'
import { calculateProgressPercentage } from '../../../../helpers/calculate-functions'

export const PartlyCompletedHabits: FunctionComponent<{
    type: HabitType
}> = ({ type }) => {
    const { activeHabits } = useGetAllActiveHabitsByType('weekly')

    // Once I have the data this will change
    if (type === 'weekly') return <></>

    const relevantHabits = activeHabits.filter(
        ({ progress }) =>
            progress?.dateOfProgress === today && progress?.progressOnDate > 0
    )

    return (
        <>
            {relevantHabits.map((habit) => {
                const partialProgressPercentage = calculateProgressPercentage(
                    habit.progress?.progressOnDate ?? 0,
                    habit.target
                )

                return (
                    <Flex
                        key={habit.id}
                        bg='white'
                        p={4}
                        borderRadius='lg'
                        boxShadow='inset'
                        borderTop='solid'
                        borderTopWidth={3}
                        borderTopColor='green.500'
                        align='center'
                        justify='space-between'
                    >
                        <Flex align='center' gap={2}>
                            <Flex gap={1}>
                                <ChevronUpIcon fill='green.500' mt={1} />
                                <Text color='green.700'>
                                    {partialProgressPercentage}%
                                </Text>
                            </Flex>
                            <Link
                                href={`/habits/${habit.urlPath}`}
                                variant='link'
                                color='neutral.900'
                                _hover={{
                                    textDecoration: 'none'
                                }}
                            >
                                {habit.name}
                                <Text as='sup'>
                                    {' '}
                                    🔥{habit.currentStreak.streak}
                                </Text>
                            </Link>
                        </Flex>
                        <Popover>
                            <PopoverTrigger>
                                <Text as='span'>
                                    <GearIcon
                                        boxSize={4}
                                        cursor='pointer'
                                        mt={1.5}
                                    />
                                </Text>
                            </PopoverTrigger>
                            <PopoverContent boxShadow='secondary'>
                                <PopoverArrow />
                                <PopoverCloseButton
                                    top={2}
                                    borderRadius='50%'
                                    _hover={{
                                        bg: 'neutral.100'
                                    }}
                                />
                                <PopoverBody>
                                    <UpdateHabitMetrics habit={habit} />
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Flex>
                )
            })}
        </>
    )
}
