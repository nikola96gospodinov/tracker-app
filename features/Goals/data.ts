// images
import CareerIcon from '../../assets/images/portfolio.png'
import HealthIcon from '../../assets/images/diet.png'
import FinancialIcon from '../../assets/images/credit-card.png'
import OtherPersonalIcon from '../../assets/images/user.png'
import FamilyIcon from '../../assets/images/family.png'
import PartnerIcon from '../../assets/images/heart-lock.png'
import CommunityIcon from '../../assets/images/group.png'
import OtherCollectiveIcon from '../../assets/images/high-five.png'

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
