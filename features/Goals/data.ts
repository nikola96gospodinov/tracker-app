// images
import CareerIcon from '../../assets/images/portfolio.png'
import HealthIcon from '../../assets/images/diet.png'
import FinancialIcon from '../../assets/images/credit-card.png'
import OtherPersonalIcon from '../../assets/images/user.png'
import FamilyIcon from '../../assets/images/family.png'
import PartnerIcon from '../../assets/images/heart-lock.png'
import CommunityIcon from '../../assets/images/group.png'
import OtherCollectiveIcon from '../../assets/images/high-five.png'

import {
    DAILY_HABITS_CAPITALIZED,
    DAILY_HABITS,
    WEEKLY_HABITS_CAPITALIZED,
    WEEKLY_HABITS,
    MILESTONES_CAPITALIZED,
    MILESTONES
} from './constants'
import DailyHabits from './IndividualGoalPage/DailyHabits/DailyHabits'
import Milestones from './IndividualGoalPage/Milestones/Milestones'
import WeeklyTargets from './IndividualGoalPage/WeeklyHabits/WeeklyHabits'

export const goalsIcons = {
    health: {
        src: HealthIcon,
        alt: 'Diet icon'
    },
    career: {
        src: CareerIcon,
        alt: 'Briefcase icon'
    },
    financial: {
        src: FinancialIcon,
        alt: 'Credit card icon'
    },
    'other-personal': {
        src: OtherPersonalIcon,
        alt: 'Person icon'
    },
    family: {
        src: FamilyIcon,
        alt: 'Family icon'
    },
    partner: {
        src: PartnerIcon,
        alt: 'Heart and lock icon'
    },
    community: {
        src: CommunityIcon,
        alt: 'Community icon'
    },
    'other-collective': {
        src: OtherCollectiveIcon,
        alt: 'People giving each other high five icon'
    }
}

export const personalGoalOptions = [
    {
        value: 'health',
        label: 'Health'
    },
    {
        value: 'career',
        label: 'Carrer'
    },
    {
        value: 'financial',
        label: 'Financial'
    },
    {
        value: 'other-personal',
        label: 'Other (Personal)'
    }
]

export const collectiveGoalOptions = [
    {
        value: 'family',
        label: 'Family'
    },
    {
        value: 'love',
        label: 'Love'
    },
    {
        value: 'community',
        label: 'Community'
    },
    {
        value: 'other-collective',
        label: 'Other (Collective)'
    }
]

export const tabs = [
    {
        name: DAILY_HABITS_CAPITALIZED,
        shortName: DAILY_HABITS,
        Component: DailyHabits
    },
    {
        name: WEEKLY_HABITS_CAPITALIZED,
        shortName: WEEKLY_HABITS,
        Component: WeeklyTargets
    },
    {
        name: MILESTONES_CAPITALIZED,
        shortName: MILESTONES,
        Component: Milestones
    }
]
