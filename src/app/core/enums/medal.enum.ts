
export enum EMedal {
    GOLD = 1,
    SILVER = 2,
    BRONZE = 3
}

// Finishing positions 4-8 share the medal column but are not medals: they have no icon and are never counted
export const EPlacings: number[] = [4, 5, 6, 7, 8];

export interface IMedalInfo {
    id: number,
    name: string,
    icon: string
}

export const EMedalInfo: IMedalInfo[] = [
    {
        id: 1,
        name: 'Gold',
        icon: '/assets/medals/gold.svg'
    },
    {
        id: 2,
        name: 'Silver',
        icon: '/assets/medals/silver.svg'
    },
    {
        id: 3,
        name: 'Bronze',
        icon: '/assets/medals/bronze.svg'
    }
]
