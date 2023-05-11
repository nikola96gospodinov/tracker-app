import type { NextPage } from 'next'

import WeeklyReview from './home/WeeklyReview'
import { PageWrapper } from '../components/Layout/PageWrapper'
import InitialSection from '../components/InitialSection'

const Home: NextPage = () => (
    <PageWrapper title='Dashboard' description='Home page'>
        <InitialSection>
            <WeeklyReview />
        </InitialSection>
    </PageWrapper>
)

export default Home
