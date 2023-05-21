import { Box } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const Container: React.FunctionComponent<PropsWithChildren> = ({
    children
}) => <Box mx={12}>{children}</Box>
