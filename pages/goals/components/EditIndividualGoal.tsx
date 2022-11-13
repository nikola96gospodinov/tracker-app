import { useRouter } from "next/router"

interface Props {
    userID: string
}

const EditIndividualGoal = ({ userID }: Props) => {
    const router = useRouter()
    const { goalURL } = router.query

    return (
        <div className='initial-section'>
            <div className='container'>
                <div className='initial-section-inner'>
                    
                </div>
            </div>
        </div>
    )
}

export default EditIndividualGoal