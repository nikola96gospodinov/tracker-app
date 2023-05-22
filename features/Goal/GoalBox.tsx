import { Box, Heading, Text, VStack } from '@chakra-ui/react'

import { Goal } from '../../types/goals.types'
import { Link } from '../../components/UIElements/Link'
import { Deadline } from '../Deadline'

export const GoalBox: React.FunctionComponent<{
    goal: Goal
}> = ({ goal }) => {
    const borderColor = (() => {
        switch (goal.status) {
            case 'active':
                return 'purple.600'
            case 'archived':
                return 'neutral.400'
            case 'completed':
                return 'green.500'
        }
    })()

    return (
        <Link
            href={`/goals/${goal.urlPath}`}
            bg='white'
            color='purple.600'
            p={6}
            borderRadius='2xl'
            transition='0.2s ease'
            position='relative'
            boxShadow='inset'
            fontWeight={500}
            fontSize='md'
            borderLeft='solid'
            borderLeftColor={borderColor}
            borderLeftWidth={3}
            _hover={{
                bg: 'white',
                transform: 'translateY(4px)'
            }}
        >
            <VStack
                color='neutral.900'
                align='flex-start'
                justify='space-between'
                h='100%'
            >
                <Box>
                    <Heading
                        as='h3'
                        fontWeight={600}
                        fontSize='xl'
                        lineHeight='1.35'
                        mb={2}
                    >
                        {goal.name}
                    </Heading>
                    <Text>{goal.description}</Text>
                </Box>

                <Box pt={goal.description ? 2 : 4}>
                    <Deadline deadline={goal.deadline} gap={1.5} />
                </Box>
            </VStack>
        </Link>
    )
}
