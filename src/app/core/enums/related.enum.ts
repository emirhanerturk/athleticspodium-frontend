
export enum ERelated {
    FATHER,
    MOTHER,
    SON,
    DOUGHTER,
    WIFE,
    HUSBAND,
    EX_WIFE,
    EX_HUSBAND,
    SISTER,
    BROTHER,
    GRANDFATHER,
    GRANDMOTHER,
    GRANDSON,
    GRANDDOUGHTER
}

export interface IRelatedInfo {
    id: number;
    name: string;
    gender: boolean;
}

export const ERelatedInfo: IRelatedInfo[] = [
    {
        id: 0,
        name: 'Father',
        gender: true
    },
    {
        id: 1,
        name: 'Mother',
        gender: false
    },
    {
        id: 2,
        name: 'Son',
        gender: true
    },
    {
        id: 3,
        name: 'Doughter',
        gender: false
    },
    {
        id: 4,
        name: 'Wife',
        gender: false
    },
    {
        id: 5,
        name: 'Husband',
        gender: true
    },
    {
        id: 6,
        name: 'Ex-wife',
        gender: false
    },
    {
        id: 7,
        name: 'Ex-husband',
        gender: true
    },
    {
        id: 8,
        name: 'Sister',
        gender: false
    },
    {
        id: 9,
        name: 'Brother',
        gender: true
    },
    {
        id: 10,
        name: 'Grandfather',
        gender: true
    },
    {
        id: 11,
        name: 'Grandmother',
        gender: false
    },
    {
        id: 12,
        name: 'Grandson',
        gender: true
    },
    {
        id: 13,
        name: 'Granddoughter',
        gender: false
    },
]
