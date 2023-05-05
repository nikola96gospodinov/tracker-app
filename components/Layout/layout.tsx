import Header from './Header/Header'
import Footer from './Footer/Footer'
import { ToasterConfigured } from '../ToasterConfigured'

const Layout: React.FunctionComponent<{
    children: React.ReactNode
}> = ({ children }) => (
    <>
        <Header />
        <main>{children}</main>
        <ToasterConfigured />
        <Footer />
    </>
)

export default Layout
