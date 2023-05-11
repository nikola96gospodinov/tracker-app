import Link from 'next/link'
import { useRouter } from 'next/router'

import Logo from '../../UIElements/Logo'
import { menu } from './data'

const Header = (): JSX.Element => {
    const router = useRouter()

    return (
        <header>
            <div></div>
            <div>
                <div>
                    <div>
                        <Logo />
                    </div>
                    <nav>
                        {menu.map((item, index) => {
                            return (
                                <Link key={index} href={item.path}>
                                    <a>{item.title}</a>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
            {/* <div>
                <img src='/images/bg-pattern-1.png' />
                <img src='/images/bg-pattern-2.png' />
            </div> */}
        </header>
    )
}

export default Header
