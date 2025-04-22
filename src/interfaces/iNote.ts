export interface iNote {
    id?: number,
    title: string,
    text: string,
    date_create: Date // не camelCase, потому что в БД так же
}