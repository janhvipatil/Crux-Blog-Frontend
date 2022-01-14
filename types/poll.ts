export interface Poll {
    options: string[],
    isEnabled: boolean,
    text: string,
    heading: string,
    name: string,
    created_at: Date,
    id: string
}

export interface PollEntry {
    id: string,
    created_at: Date,
    selected_option: string,
    poll_id: string
}