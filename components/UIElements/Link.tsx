import NextLink from 'next/link'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const Link: React.FunctionComponent<
    PropsWithChildren<
        {
            href: string
        } & LinkProps
    >
> = ({ href, children, ...linkProps }) => (
    <NextLink href={href} passHref>
        <ChakraLink py={2} {...linkProps}>
            {children}
        </ChakraLink>
    </NextLink>
)
