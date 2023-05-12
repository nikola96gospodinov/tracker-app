import { Flex, Link, Text } from '@chakra-ui/react'

const Logo = (): JSX.Element => (
    <Link href='/' variant='link' _hover={{ textDecoration: 'none' }}>
        <Flex
            flexDir='column'
            textTransform='uppercase'
            h={16}
            justifyContent='center'
            position='relative'
        >
            <Text
                color='neutral.50'
                fontSize='xl'
                fontWeight={600}
                letterSpacing='0.1rem'
                mt={1}
                zIndex={1}
                textTransform='lowercase'
                bgGradient='linear(to-b, purple.500, transparent 4.5rem)'
                w='4.5rem'
                textAlign='center'
                boxShadow='inset'
                borderRadius={30}
            >
                Solve
            </Text>
            <Text
                fontSize='2xl'
                color='purple.900'
                fontWeight={700}
                margin={0}
                letterSpacing='0.25rem'
                mt='-0.375rem'
                ml={8}
                zIndex={1}
            >
                LIFE
            </Text>
        </Flex>
    </Link>
)

export default Logo
