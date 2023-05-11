import { NextPage } from 'next'

import { GoalsContent } from './features/GoalsContent'
import { PageWrapper } from '../../components/Layout/PageWrapper'

const Goals: NextPage = () => (
    <PageWrapper title='Goals' description='This is where your goals live'>
        <GoalsContent />
    </PageWrapper>
)

export default Goals
