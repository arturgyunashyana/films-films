export type User = {
    name: string,
    surname: string,
    age: number,
    email: string,
    password: string,
    userId: Date,
    admin: boolean
}

export type AddFilm = {
    year: number,
    genres: string[],
    translation: string,
    producer: string,
    country: string,
    actions: string[]
}