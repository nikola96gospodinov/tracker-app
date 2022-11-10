import { collection, doc, setDoc } from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { MdErrorOutline } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../../../firebase/firebase'
import useGetGoals from '../hooks/useGetGoals'

import { Goal } from '../interfaces'

const now = new Date()
const today = now.toISOString().substring(0, 10)

interface Props {
    setAddGoalsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    userID: string
}

const AddGoalForm = ({ setAddGoalsFormOpen, userID }: Props) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [category, setCategory] = useState('')
    const [errors, setErrors] = useState({
        nameErr: '',
        categoryErr: false,
        form: false
    })
    const [triedSubmitting, setTriedSubmitting] = useState(false)

    const { goals } = useGetGoals(userID)
    const goalsCollection = collection(db, 'goals')
    const goalsRef = doc(goalsCollection, userID)
    const goalsNames = useMemo(() => goals?.map((goal: Goal) => goal.name), [goals])

    const addGoal = async (newGoal: Goal) => {
        if (goals) {
            try {
                setDoc(goalsRef, { data: [...goals, newGoal] }, { merge: true })
                setAddGoalsFormOpen(false)
            } catch (e) {
                console.log(e)
                setErrors({
                    ...errors,
                    form: true
                })
            }
        }
    }

    useEffect(() => {
        if (triedSubmitting) {
            if (!errors.nameErr && !errors.categoryErr && !errors.form) {
                const newGoal = {
                    id: uuidv4(),
                    name,
                    category,
                    deadline,
                    description
                } as Goal
                addGoal(newGoal)
            }
        }
    }, [triedSubmitting, errors.nameErr, errors.categoryErr, errors.form])

    const FormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const nameError = () => {
            if (name === '') return 'Please set a name for the goal'
            if (goalsNames?.includes(name)) return 'Name of the goal must be unique'
            return ''
        }

        setErrors({
            ...errors,
            nameErr: nameError(),
            categoryErr: !Boolean(category)
        })

        setTriedSubmitting(true)
    }

    return (
        <div className='backdrop'>
            <div className='form-container'>
                <AiFillCloseCircle
                    className='close'
                    onClick={() => setAddGoalsFormOpen(false)}    
                />
                <h1>Set a goal</h1>
                <form onSubmit={(e) => FormSubmit(e)}>
                    <label htmlFor='name'>Name</label>
                    <input
                        id='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.nameErr && <span className='field-error'>{errors.nameErr}</span>}
                    <label htmlFor='category'>Category</label>
                    <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <optgroup label='Individual'>
                            <option value='health'>Health</option>
                            <option value='career'>Career</option>
                            <option value='financial'>Financial</option>
                            <option value='other-personal'>Other (Individual)</option>
                        </optgroup>
                        <optgroup label='Collective'>
                            <option value='family'>Family</option>
                            <option value='partner'>Partner</option>
                            <option value='comunity'>Community</option>
                            <option value='other-collective'>Other (Collective)</option>
                        </optgroup>
                    </select>
                    {errors.categoryErr && <span className='field-error'>Please select a category</span>}
                    <label htmlFor='deadline'>Deadline (Optional)</label>
                    <input
                        id='deadline'
                        type='date'
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        min={today}
                    />
                    <label htmlFor='description'>Description (Optional)</label>
                    <textarea
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type='submit'
                        value='Set goal'
                        className='button button-primary'
                    />
                </form>
                {
                    errors.form &&
                        <div className='form-error'>
                            <MdErrorOutline />
                            <span>There was an issue setting your goal. Please try again</span>
                        </div>
                }
            </div>
        </div>
    )
}

export default AddGoalForm