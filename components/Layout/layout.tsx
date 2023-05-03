import Header from './Header/Header'
import Footer from './Footer/Footer'
import useUserLogged from '../../hooks/useUserLogged'
import { ToasterConfigured } from '../ToasterConfigured'
import { Spinner } from '../UIElements/Spinner'

const Layout: React.FunctionComponent<{
    children: React.ReactNode
}> = ({ children }) => {
    const { user, isLoading } = useUserLogged()

    if (isLoading || !user) {
        return (
            <div className='full-screen-centered'>
                <Spinner />
            </div>
        )
    }

    return (
        <>
            <Header />
            <main>{children}</main>
            <ToasterConfigured />
            <Footer />
        </>
    )
}

export default Layout
