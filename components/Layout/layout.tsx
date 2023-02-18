import Header from './Header/Header'
import Footer from './Footer/Footer'
import useUserLogged from '../../hooks/useUserLogged'
import Spinner from '../UIElements/spinner'

const Layout: React.FunctionComponent<{
    children: React.ReactNode
}> = ({ children }) => {
    const { user, isLoading } = useUserLogged()

    if (isLoading || !user) {
        return (
            <div className='full-screen-centered'>
                <Spinner size={10} />
            </div>
        )
    }

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout
