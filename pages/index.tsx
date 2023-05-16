import type { NextPage } from 'next'

import { PageWrapper } from '../components/Layout/PageWrapper'
import InitialSection from '../components/InitialSection'
import { Dashboard } from './home/Dashboard'

const Home: NextPage = () => (
    <PageWrapper title='Dashboard' description='Home page'>
        <InitialSection>
            <Dashboard />
        </InitialSection>
    </PageWrapper>
)

export default Home
