import { NextPage } from 'next'

import { HabitsContent } from './features/HabitsContent'
import { PageWrapper } from '../../components/Layout/PageWrapper'

const Habits: NextPage = () => (
    <PageWrapper title='Habits' description='This is where your habits live'>
        <HabitsContent />
    </PageWrapper>
)

export default Habits
