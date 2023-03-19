import Link from 'next/link'

import style from '../goal.module.scss'

const NoHabits: React.FunctionComponent<{
    shortName: string
}> = ({ shortName }) => (
    <div className={style.noData}>
        <p>You dont&apos;t have any {shortName}s added yet</p>
        <Link href='/habits'>
            <a className='button button-primary'>Add some</a>
        </Link>
    </div>
)

export default NoHabits
