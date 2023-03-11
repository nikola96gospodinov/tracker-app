import { Toaster } from 'react-hot-toast'

export const ToasterConfigured = () => (
    <Toaster
        position='top-right'
        gutter={16}
        toastOptions={{
            duration: 5000
        }}
    />
)
