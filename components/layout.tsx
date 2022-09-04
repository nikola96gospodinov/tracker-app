import Header from './Header/Header'
import Footer from './Footer/footer'

const Layout = ({ children }: { children: JSX.Element }) => {
    return (
        <>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
}

export default Layout