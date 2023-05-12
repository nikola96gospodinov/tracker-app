import DashboardIcon from '../../Icons/DashboardIcon'
import RepeatIcon from '../../Icons/RepeatIcon'
import TargetIcon from '../../Icons/TargetIcon'
import UserIcon from '../../Icons/UserIcon'

export const menu = [
    { title: 'Dashboard', path: '/', subpath: 'home', icon: DashboardIcon },
    { title: 'Goals', path: '/goals', subpath: 'goals', icon: TargetIcon },
    { title: 'Habits', path: '/habits', subpath: 'habits', icon: RepeatIcon },
    { title: 'Profile', path: '/profile', subpath: 'profile', icon: UserIcon }
]
