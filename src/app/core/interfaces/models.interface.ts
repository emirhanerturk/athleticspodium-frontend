
export interface IChamps {
    id: number,
    name: string,
    slug: string,
    content: string,
    rank: number,
    created_date: Date,
    updated_date: Date,
    // includes
    meetings?: IMeeting[]
}

export interface IMeeting {
    id: number,
    champs_id: number,
    edition: number,
    name: string,
    year: number,
    country_code: string,
    city: string,
    content: string,
    created_date: Date,
    updated_date: Date
}

export interface IEvent {
    id: number,
    name: string,
    gender: boolean
}

export interface IMedal {
    id: number,
    champs_id: number,
    meeting_id: number,
    event_id: number,
    medal: number,
    player_id: number,
    country_code: string,
    mark: number,
    mark_format: string,
    mark_display: string,
    order: number,
    wind: number,
    info: string,
    record: string,
    is_canceled: boolean,
    notes: string,
    created_date: Date,
    updated_date: Date,
    // includes
    champ?: IChamps
    meeting?: IMeeting
    event?: IEvent
    player?: IPlayer
    country?: ICountry
}

export interface IPlayer {
    id: number,
    first_name: string,
    last_name: string,
    aka: string[],
    slug: string,
    country_code: string,
    gender: boolean,
    birth_date: Date,
    biography: string,
    created_date: Date,
    updated_date: Date
}

export interface ICountry {
    code: string,
    name: string,
    content: string
}
