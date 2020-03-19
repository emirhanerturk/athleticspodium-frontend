
export enum EMedal {
    GOLD = 1,
    SILVER = 2,
    BRONZE = 3
}

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
