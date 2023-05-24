import { FunctionComponent } from 'react'
import {
    Flex,
    Text,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger
} from '@chakra-ui/react'

import { Goal } from '../../../../types/goals.types'
import CheckIcon from '../../../../components/Icons/CheckIcon'
import GearIcon from '../../../../components/Icons/GearIcon'

export const CompletedGoals: FunctionComponent<{
    goals: Goal[]
}> = ({ goals }) => (
    <>
        {goals.map((goal) => (
            <Flex
                key={goal.id}
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
                    <Text>{goal.name}</Text>
                </Flex>
                <Popover>
                    <PopoverTrigger>
                        <Text as='span'>
                            <GearIcon boxSize={4} cursor='pointer' mt={1.5} />
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
                        <PopoverBody></PopoverBody>
                    </PopoverContent>
                </Popover>
            </Flex>
        ))}
    </>
)
