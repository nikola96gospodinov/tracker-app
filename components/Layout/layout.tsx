import Header from './Header/Header'
import Footer from './Footer/Footer'

const Layout: React.FunctionComponent<{
    children: React.ReactNode
}> = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout
