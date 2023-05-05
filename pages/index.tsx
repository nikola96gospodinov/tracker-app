import type { NextPage } from 'next'

import WeeklyReview from '../features/Home/WeeklyReview'
import { PageWrapper } from '../components/Layout/PageWrapper'

const Home: NextPage = () => (
    <PageWrapper title='Dashboard' description='Home page'>
        <WeeklyReview />
    </PageWrapper>
)

export default Home
