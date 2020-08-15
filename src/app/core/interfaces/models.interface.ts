
import { EGender } from "@enums/gender.enum";
import { ECategory } from "@enums/category.enum";
import { EContactSubject } from "@enums/contact-subject.enum";

export interface IChamps {
    id: number,
    name: string,
    slug: string,
    category?: ECategory,
    countries?: string[],
    years?: number[],
    events_men?: number[],
    events_women?: number[],
    events_mixed?: number[],
    content?: string,
    rank?: number,
    created_date?: Date,
    updated_date?: Date,
    // includes
    meetings?: IMeeting[]
}

export interface IMeeting {
    id: number,
    champ_id: number,
    year: number,
    edition: number,
    short_name: string,
    name: string,
    slug: string,
    country_code: string,
    city: string,
    start_date: Date,
    end_date: Date,
    content?: string,
    created_date: Date,
    updated_date?: Date,
    // includes
    champ?: IChamps,
    country?: ICountry,
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
    date_of_birth: Date,
    date_of_death: Date,
    place_of_birth: string,
    events: string[],
    image?: IImage[],
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
    categories?: ECategory[],
    is_country?: boolean,
    created_date?: Date,
    updated_date?: Date,
}

export interface IImage {
    uri: string,
    credit?: string,
    caption?: string,
    cover?: boolean,
    created_date?: Date,
}

export interface IContact {
    id?: number,
    name: string,
    email: string,
    subject: EContactSubject,
    message: string,
    file?: string,
    ip_address?: string,
    user_info?: string,
    created_date?: Date,
    updated_date?: Date
}


export interface IPage {
    id: string,
    slug: string,
    section: string,
    title: string,
    content?: string,
    created_date: Date,
    updated_date?: Date,
}
