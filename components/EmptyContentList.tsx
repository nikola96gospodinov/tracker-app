import { Dispatch } from '../typings'

const EmptyContentList: React.FunctionComponent<{
    name: string
    setAddFormOpen: Dispatch<boolean>
}> = ({ name, setAddFormOpen }) => (
    <div className='noContent'>
        <p>No {name.toLowerCase()} yet. Let&apos;s add some!</p>
        <button
            className='button button-primary'
            onClick={() => setAddFormOpen(true)}
        >
            Add {name.toLowerCase()}
        </button>
    </div>
)

export default EmptyContentList
