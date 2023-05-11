import { Flex, Link, Text, Box } from '@chakra-ui/react'

const Logo = (): JSX.Element => (
    <Link href='/' variant='link'>
        <Flex
            flexDir='column'
            borderRadius={16}
            textTransform='uppercase'
            height={16}
            justifyContent='center'
        >
            <Text
                color='neutral.50'
                fontSize='xl'
                fontWeight={600}
                letterSpacing='0.1rem'
                mt={1}
                zIndex={1}
                ml={5}
                textTransform='lowercase'
            >
                Solve
            </Text>
            <Text
                fontSize='2xl'
                color='purple.100'
                fontWeight={700}
                margin={0}
                letterSpacing='0.25rem'
                mt='-0.375rem'
                ml='2.3rem'
                zIndex={1}
            >
                LIFE
            </Text>
            <Box
                w={16}
                h={16}
                borderRadius='50%'
                position='absolute'
                bgGradient='linear(to-r, purple.300, neutral.900 2.25rem)'
            />
        </Flex>
    </Link>
)

export default Logo
