const InitialSection: React.FunctionComponent<{
    children: React.ReactNode
}> = ({ children }) => {
    return (
        <div className='initial-section'>
            <div className='container'>
                <div className='initial-section-inner'>{children}</div>
            </div>
        </div>
    )
}

export default InitialSection