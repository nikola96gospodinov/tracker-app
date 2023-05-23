import DashboardIcon from '../../Icons/DashboardIcon'
import ListIcon from '../../Icons/ListIcon'
import RepeatIcon from '../../Icons/RepeatIcon'
import TargetIcon from '../../Icons/TargetIcon'

export const menu = [
    { title: 'Dashboard', path: '/', subpath: 'home', icon: DashboardIcon },
    { title: 'Goals', path: '/goals', subpath: 'goals', icon: TargetIcon },
    { title: 'Habits', path: '/habits', subpath: 'habits', icon: RepeatIcon },
    { title: 'Todos', path: '/todos', subpath: 'todos', icon: ListIcon }
]
