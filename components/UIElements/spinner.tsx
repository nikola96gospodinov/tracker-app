import {
    Flex,
    FlexProps,
    Spinner as SpinnerComponent,
    Text
} from '@chakra-ui/react'

export const Spinner: React.FunctionComponent<
    { text?: string } & FlexProps
> = ({ text, ...flexProps }) => (
    <Flex
        flexDir='column'
        alignItems='center'
        justifyContent='center'
        {...flexProps}
    >
        <SpinnerComponent
            thickness='0.25rem'
            speed='1s'
            emptyColor='neutral.200'
            color='purple.500'
            size='xl'
        />
        {text && (
            <Text fontSize='2xl' mt={4}>
                {text}
            </Text>
        )}
    </Flex>
)
