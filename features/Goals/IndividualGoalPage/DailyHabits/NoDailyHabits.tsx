import Link from 'next/link'

import style from '../../goal.module.scss'

const NoDailyHabits = () => (
    <div className={style.noData}>
        <p>You dont&apos;t have any daily habits added yet</p>
        <Link href='/habits'>
            <a className='button button-primary'>Add some</a>
        </Link>
    </div>
)

export default NoDailyHabits
