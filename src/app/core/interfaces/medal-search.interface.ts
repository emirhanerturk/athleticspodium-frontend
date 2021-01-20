export interface IMedalSearch {
    champs: string,
    country: string,
    event: string,
    year: string,
    gender: string,
    medal: string,
    is_canceled?: string,
    page?: number,
    order?: 'year'|'champs'|'event'|'medal'|'athlete'|'gender'|'country'
}
