import Header from './Header/Header'
import Footer from './Footer/Footer'

const Layout = ({ children }: { children: React.ReactNode }) => {
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