
export enum EGender {
    MEN,
    WOMEN,
    MIXED,
}

export interface IGenderInfo {
    id: number,
    name: string,
    sex: boolean
}

export const EGenderInfo: IGenderInfo[] = [
    {
        id: 0,
        name: 'Men',
        sex: true
    },
    {
        id: 1,
        name: 'Women',
        sex: true
    },
    {
        id: 2,
        name: 'Mixed',
        sex: false
    }
]
