interface Props {
    children: React.ReactNode
}

const InitialSection = ({ children }: Props) => {
    return (
        <div className='initial-section'>
            <div className='container'>
                <div className='initial-section-inner'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default InitialSection