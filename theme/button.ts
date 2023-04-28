export const Button = {
    baseStyle: {
        display: 'block',
        fontSize: 'xl',
        borderRadius: 'lg',
        transition: '0.3s',
        px: 2,
        py: 10,
        cursor: 'pointer'
    },
    sizes: {
        xsm: {
            px: 2,
            py: 5
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
            display: 'block',
            fontSize: 5,
            fontWeight: 600,
            color: 'purple.600',
            border: '0.1rem solid',
            borderColor: 'purple.600',
            padding: '0.4rem 2.4rem',

            _hover: {
                background: 'purple.600',
                color: 'neutral.50',
                fontWeight: 500
            }
        },
        disabled: {
            backgroundColor: 'neutral.50',
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
        variant: 'primary'
    }
}
