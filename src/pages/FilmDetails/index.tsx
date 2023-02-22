import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { feachFilmDetalis } from "../../features/films/filmsApi"
import { Film } from "../../types/film"
import FilmDetailsStyles from "./filmdetails.module.css"
import { actorsType } from "../../types/actors";

export const FilmDetails: React.FC = (): JSX.Element => {

    const [item, setItem] = useState<Film>()

    const { film, films } = useAppSelector(state => state.films)
    console.log(film);


    const [blog, setBlog] = useState(null)

    const { id } = useParams<string>()

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(feachFilmDetalis(String(id)))
        console.log(id);
    }, [])

    return (
        <>
            <div className={FilmDetailsStyles.filmdetails}>
                <div className={FilmDetailsStyles.home__row}>
                    <div>
                        <h4 className="text-light">
                            {film.title}
                        </h4>
                    </div>
                    <div
                        className={FilmDetailsStyles.main}
                    >
                        <div>
                            <img
                                src={film.photo}
                                alt={film.photo}
                            />
                        </div>
                        <div className="text-light">
                            <strong>Year: {film.years?.value}</strong>
                            <div>Country: {film.country?.value} </div>
                            <div>
                                Genres:
                                {
                                    film.genres && film.genres.map((elm: actorsType, index: number) => {
                                        return (
                                            <span key={index}>
                                                &nbsp; {elm.value} 
                                            </span>
                                        )
                                    })
                                }
                            </div>
                            <div>Time: {film?.time} </div>
                            <div className="mt-3">
                                Producer: {film.producer?.value}
                            </div>
                            <div className={FilmDetailsStyles.items}>
                                Actors:
                                {
                                    film.actors && film.actors.map((elm: actorsType, index: number) => {
                                        return (
                                            <span key={index}>
                                                {elm.value} 
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-light mt-4">
                            {film.description}
                        </p>
                    </div>
                    <div>
                        <video
                            style={{
                                width: "100%",
                                height: "400px",
                                objectFit: "cover"
                            }}
                            controls
                            src={film.video}
                        >
                        </video>
                    </div>
                </div>
            </div>
        </>
    )
}