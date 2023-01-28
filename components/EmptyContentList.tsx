interface Props {
    name: string
    setAddFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EmptyContentList = ({ name, setAddFormOpen }: Props): JSX.Element => {
    return (
        <div className='noContent'>
            <p>No {name.toLowerCase()} yet. Let&apos;s add some!</p>
            <button
                className='button button-primary'
                onClick={() => setAddFormOpen(true)}
            >Add {name.toLowerCase()}</button>
        </div>
    )
}

export default EmptyContentList