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

import { Milestone } from '../../../../types/goals.types'
import CheckIcon from '../../../../components/Icons/CheckIcon'
import GearIcon from '../../../../components/Icons/GearIcon'
import { UpdateMilestoneMetrics } from '../../../UpdateMetrics/UpdateMilestoneMetrics'

export const CompletedMilestones: FunctionComponent<{
    milestones: Milestone[]
}> = ({ milestones }) => (
    <>
        {milestones.map((milestone) => (
            <Flex
                key={milestone.id}
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
                    <Text>{milestone.name}</Text>
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
                        <PopoverBody>
                            <UpdateMilestoneMetrics
                                milestone={milestone}
                                toggleText='Completed! 🥳'
                            />
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Flex>
        ))}
    </>
)
