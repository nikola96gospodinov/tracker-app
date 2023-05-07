import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack
} from '@chakra-ui/react'
import { FormHeading } from './FormHeading'
import { FormError } from './FormError'

export const FormModal: React.FunctionComponent<{
    children: React.ReactNode
    formOpen: boolean
    onFormClose: () => void
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    title?: string
    isFormError?: boolean
    formError?: string
}> = ({
    children,
    formOpen,
    onFormClose,
    onSubmit,
    title,
    isFormError,
    formError
}) => (
    <Modal isOpen={formOpen} onClose={onFormClose}>
        <ModalOverlay backdropFilter='blur(10px)' />
        <ModalContent borderRadius='xl' p={8} bg='neutral.50'>
            {title && (
                <ModalHeader p={0}>
                    <FormHeading>{title}</FormHeading>
                </ModalHeader>
            )}
            <ModalCloseButton
                bg='red.50'
                color='red.900'
                borderRadius='50%'
                boxShadow='inset'
                top={4}
                right={4}
                transition='0.2s ease'
                _hover={{
                    color: 'red.800',
                    bg: 'red.100'
                }}
            />
            <ModalBody p={0} mt={8}>
                <form onSubmit={(e) => onSubmit(e)}>
                    <Stack gap={3}>{children}</Stack>
                </form>
                <FormError formError={!!isFormError} errorText={formError} />
            </ModalBody>
        </ModalContent>
    </Modal>
)
