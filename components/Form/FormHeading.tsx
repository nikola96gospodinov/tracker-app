import { Heading } from '@chakra-ui/react'
import { FunctionComponent, PropsWithChildren } from 'react'

export const FormHeading: FunctionComponent<PropsWithChildren> = ({
    children
}) => (
    <Heading as='h1' fontSize='2xl' lineHeight='1.5' fontWeight={600}>
        {children}
    </Heading>
)
