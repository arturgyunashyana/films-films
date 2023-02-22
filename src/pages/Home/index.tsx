import React, { useEffect } from "react"
import HomeStyles from "./home.module.css"
import { Main } from "../../components/Main"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase.config"
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { setFilm } from "../../features/films/filmsSlice"
import { Link } from "react-router-dom"
import { feachFilmsData, feachGenresData, feachSliderFilmsData, filteredFilms } from "../../features/films/filmsApi"

export const Home: React.FC = (): JSX.Element => {

    const dispatch = useAppDispatch()

    const { films, genresOption } = useAppSelector(state => state.films)
    console.log(genresOption)

    const filmsCollection = collection(db, "films")

    const genresCollection = collection(db, "genres")

    const actorsCollection = collection(db, "actors")

    const countryCollection = collection(db, "country")

    const getFilm = async () => {
        let data = await getDocs(filmsCollection)
        data.forEach((elm: any) => {
            dispatch(setFilm(elm.data()))
        })
    }

    const getCountry = async () => {
        let data = await getDocs(countryCollection)
        data.forEach((elm: any) => {
            dispatch(setFilm(elm.data()))
        })
    }

    const getActors = async () => {
        let data = await getDocs(actorsCollection)
        data.forEach((elm: any) => {
            dispatch(setFilm(elm.data()))
        })
    }

    const getGenres = async () => {
        let data = await getDocs(genresCollection)
        data.forEach((elm: any) => {
            dispatch(setFilm(elm.data()))
        })
    }

    const filteredGenres = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(filteredFilms(e.target.value))
        console.log(e.target.value);
    }
    
    useEffect(() => {
        getFilm()
        dispatch(feachFilmsData())
        dispatch(feachGenresData())
        dispatch(feachSliderFilmsData())
    }, [])

    return (
        <>
            <div className={HomeStyles.home}>
                <h1 className="text-center text-light">
                    Films
                </h1>
                <select
                    onChange={filteredGenres}
                    className={HomeStyles.select}
                >
                    <option></option>
                    {
                        genresOption.map((elm: any, index: number) => {
                            return (
                                <option key={index}>
                                    {elm.value}
                                </option>
                            )
                        })
                    }
                </select>
                <Main />
                <div className={HomeStyles.home__content}>
                    {
                        films.map((elm: any, index: number) => {
                            return (
                                <div className={HomeStyles.home__row} key={index}>
                                    <div>
                                        <h4 className="text-light">{elm.title}</h4>
                                    </div>
                                    <div className={HomeStyles.main}>
                                        <div>
                                            <img
                                                src={elm.photo}
                                                alt={elm.photo}
                                            />
                                        </div>
                                        <div className="text-light">
                                            <strong>Year: {elm.years.value}</strong>
                                            <div>Country: {elm.country.value}</div>
                                            <span>Genres: {elm.genres.value}</span>
                                            <div>Time: {elm.time}</div>
                                            <div>
                                                <button
                                                    className="btn btn-success"
                                                >
                                                    <Link
                                                        className="text-light"
                                                        to={"/filmdetails/" + elm.id}
                                                    >
                                                        See Film
                                                    </Link>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}