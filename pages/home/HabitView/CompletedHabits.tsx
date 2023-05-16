import { FunctionComponent } from 'react'
import {
    Flex,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    SimpleGrid,
    Text
} from '@chakra-ui/react'

import { Habit } from '../../habits/habits.types'
import CheckIcon from '../../../components/Icons/CheckIcon'
import GearIcon from '../../../components/Icons/GearIcon'
import { Link } from '../../../components/UIElements/Link'
import { UpdateHabitMetrics } from '../../habits/features/UpdateHabitMetrics/UpdateHabitMetrics'

export const CompletedHabits: FunctionComponent<{
    completedHabits: Habit[]
}> = ({ completedHabits }) => {
    return (
        <SimpleGrid columns={3} gap={4} w='100%' pt={4}>
            {completedHabits.map((habit) => (
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
                        <CheckIcon boxSize={5} fill='green.500' />
                        <Link
                            href={`/habits/${habit.urlPath}`}
                            variant='link'
                            color='neutral.900'
                            _hover={{
                                textDecoration: 'none'
                            }}
                        >
                            {habit.name}
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
            ))}
        </SimpleGrid>
    )
}
