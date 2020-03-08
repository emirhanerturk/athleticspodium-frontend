
import { EGender } from "@enums/gender.enum";
import { ECategory } from "@enums/category.enum";

export interface IChamps {
    id: number,
    name: string,
    slug: string,
    category: ECategory,
    countries: string[],
    years: number[],
    events_men: number[],
    events_women: number[],
    events_mixed: number[],
    content?: string,
    rank: number,
    created_date: Date,
    updated_date?: Date,
    // includes
    meetings?: IMeeting[]
}

export interface IMeeting {
    id: number,
    champs_id: number,
    year: number,
    edition: number,
    short_name: string,
    name: string,
    slug: string,
    country_code: string,
    city: string,
    content?: string,
    created_date: Date,
    updated_date?: Date,
    // includes
    champ?: IChamps,
}

export interface IEvent {
    id: number,
    name: string,
    rank: number,
}

export interface IMedal {
    id: number,
    champ_id: number,
    meeting_id: number,
    event_id: number,
    medal: number,
    athlete_id: number,
    athlete_name: string,
    country_code: string,
    gender: EGender,
    mark: number,
    mark_format: string,
    mark_display: string,
    order: number,
    wind: number,
    info: string,
    records: string,
    is_team: boolean,
    is_canceled: boolean,
    notes: string,
    created_date: Date,
    updated_date?: Date,
    // includes
    champ?: IChamps
    meeting?: IMeeting
    event?: IEvent
    athlete?: IAthlete
    country?: ICountry
}

export interface IAthlete {
    id: number,
    first_name: string,
    last_name: string,
    aka: string[],
    slug: string,
    country_code: string,
    gender: EGender,
    olympic_mark: boolean,
    birth_date: Date,
    birth_place: string,
    biography: string,
    created_date: Date,
    updated_date?: Date,
    // includes
    country: ICountry
}

export interface ICountry {
    code: string,
    name: string,
    content?: string,
    categories: ECategory[],
    is_country: boolean,
    created_date: Date,
    updated_date?: Date,
}
