import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { actorsType } from '../../types/actors'
import { Film } from '../../types/film'
import { User } from '../../types/users'
import {
    // editUser,
    feachActorsData,
    feachCountryData,
    feachFilmDetalis,
    feachFilmsData,
    feachGenresData,
    feachProducersData,
    feachSliderFilmsData,
    feachTranslationData,
    feachYearsData,
    filteredFilms,} from './filmsApi'

export interface FilmsState {
    user: User,
    films: any[],
    film: any,
    countryOption: actorsType[],
    genresOption: actorsType[],
    actorsOption: actorsType[],
    sliderFilms: any[],
    producerOption: actorsType[],
    translationOption: actorsType[],
    yearsOption: actorsType[],
    filterfilm: actorsType[]
}

const state: FilmsState = {
    user: {} as User,
    films: [],
    film: {} as Film,
    countryOption: [],
    genresOption: [],
    actorsOption: [],
    producerOption: [],
    translationOption: [],
    yearsOption: [],
    filterfilm: [],
    sliderFilms: []
}

export const filmsSlice = createSlice({
    name: "films",
    initialState: state,
    reducers: {
        userFunc(state, action) {
            state.user = action.payload
        },
        setFilm: (state, action: PayloadAction<any>) => {
            if (!state.films.some(film => film.filmId === action.payload.id)) {
                state.films.push(action.payload)
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(feachCountryData.fulfilled, (state, action) => {
            state.countryOption = action.payload
        })
        builder.addCase(feachGenresData.fulfilled, (state, action) => {
            state.genresOption = action.payload
        })
        builder.addCase(feachActorsData.fulfilled, (state, action) => {
            state.actorsOption = action.payload
        })
        builder.addCase(feachProducersData.fulfilled, (state, action) => {
            state.producerOption = action.payload
        })
        builder.addCase(feachTranslationData.fulfilled, (state, action) => {
            state.translationOption = action.payload
        })
        builder.addCase(feachYearsData.fulfilled, (state, action) => {
            state.yearsOption = action.payload
        })
        builder.addCase(feachFilmsData.fulfilled, (state, action) => {
            state.films = action.payload
        })
        builder.addCase(feachSliderFilmsData.fulfilled, (state, action) => {
            state.sliderFilms = action.payload
        })
        builder.addCase(feachFilmDetalis.fulfilled, (state, action) => {
            console.log(action.payload)
            state.film = action.payload || {} as any
        })
        builder.addCase(filteredFilms.fulfilled, (state, action) => {
            console.log(action.payload)
            state.films = action.payload
        })
    }
})

export const { userFunc, setFilm } = filmsSlice.actions
export default filmsSlice.reducer