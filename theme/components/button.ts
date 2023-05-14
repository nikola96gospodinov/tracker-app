export const Button = {
    baseStyle: {
        borderRadius: 'lg',
        transition: '0.3s',
        cursor: 'pointer',
        py: 6,
        fontWeight: 500,
        _hover: {
            textDecoration: 'none'
        }
    },
    sizes: {
        md: {
            fontSize: 'xl',
            px: 10
        },
        sm: {
            height: 'auto',
            py: 2,
            px: 4,
            mt: 8,
            mr: 1,
            boxShadow: 'none',
            fontSize: 'md'
        }
    },
    variants: {
        primary: {
            background: 'purple.600',
            color: 'neutral.50',
            border: 'none',
            boxShadow: 'main',
            _hover: {
                boxShadow: 'secondary',
                transform: 'translateY(0.1rem)',
                background: 'purple.700'
            }
        },
        secondary: {
            background: 'neutral.50',
            color: 'neutral.900',
            fontWeight: 600,
            border: 'none',
            boxShadow: 'main',
            _hover: {
                background: 'purple.400',
                transform: 'translateY(0.1rem)',
                color: 'neutral.50'
            }
        },
        tertiary: {
            fontWeight: 600,
            color: 'neutral.900',
            bg: 'neutral.100',
            _hover: {
                background: 'neutral.200'
            }
        },
        disabled: {
            backgroundColor: 'purple.50',
            color: 'purple.500',
            border: 'none',
            boxShadow: 'none',
            cursor: 'not-allowed'
        },
        delete: {
            background: 'red.600',
            color: 'neutral.50',
            border: 'none',
            boxShadow: 'main',
            _hover: {
                boxShadow: 'hover',
                transform: 'translateY(0.1rem)',
                background: 'red.700'
            }
        },
        link: {
            p: 0,
            border: 'none',
            fontSize: 'md',
            background: 'transparent',
            color: 'purple.600',

            _hover: {
                textDecoration: 'underline'
            }
        }
    },
    defaultProps: {
        variant: 'primary',
        size: 'md'
    }
}
