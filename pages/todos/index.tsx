import { NextPage } from 'next'

import { PageWrapper } from '../../components/Layout/PageWrapper'
import { TodosContent } from '../../features/Todos/TodosContent'

const Todos: NextPage = () => (
    <PageWrapper title='Todos' description='This is where your Todos live'>
        <TodosContent />
    </PageWrapper>
)

export default Todos
