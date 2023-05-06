import { Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'

import { Link } from './UIElements/Link'

const NoGoals = (): JSX.Element => (
    <Stack alignItems='center' justifyContent='center'>
        <Image
            src='/images/no-goals.png'
            alt='no goals icon'
            width={128}
            height={128}
        />
        <Text fontSize='2xl' pb={4}>
            It seems like you haven&apos;t set any goals yet
        </Text>
        <Link size='md' href='/goals'>
            Set goals
        </Link>
    </Stack>
)

export default NoGoals
