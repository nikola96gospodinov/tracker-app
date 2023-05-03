import { Heading } from '@chakra-ui/react'

export const FormHeading: React.FunctionComponent<{
    text: string
}> = ({ text }) => (
    <Heading as='h1' fontSize='2xl' fontWeight={600}>
        {text}
    </Heading>
)
