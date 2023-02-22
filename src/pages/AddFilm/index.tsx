import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import AddFilmStyles from "./addfilm.module.css"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase.config";
import { Film } from "../../types/film";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { feachActorsData, feachCountryData, feachGenresData, feachProducersData, feachTranslationData, feachYearsData } from "../../features/films/filmsApi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const AddFilm: React.FC = (): JSX.Element => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm<any>()

    const dispatch = useAppDispatch()

    const {
        countryOption,
        genresOption,
        actorsOption,
        producerOption,
        translationOption,
        yearsOption } = useAppSelector(state => state.films)

    const [genres, setGenres] = useState<Film[]>([])

    useEffect(() => {
        dispatch(feachCountryData())
        dispatch(feachGenresData())
        dispatch(feachActorsData())
        dispatch(feachProducersData())
        dispatch(feachTranslationData())
        dispatch(feachYearsData())
    }, [])

    const photoCollection = collection(db, "photo")

    const filmCollection = collection(db, "films")

    const save = async (data: Film) => {
        console.log(data);
        let res = await addDoc(filmCollection, {
            created: Date.now(),
            title: data.title,
            years: data.years,
            producer: data.producer,
            description: data.description,
            translation: data.translation,
            time: data.time,
            country: data.country,
            actors: data.actors,
            genres: data.genres
        })
        console.log(res);

        let file: any = data.photo[0]
        const imageRef = ref(storage, 'images/' + Date.now() + file.name);
        uploadBytesResumable(imageRef, file)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {
                    await updateDoc(res, {
                        photo: url
                    });
                });
            }).catch((error) => {
                console.error('Upload failed', error);
            });

        let video: any = data.video[0]
        const videoRef = ref(storage, 'videos/' + Date.now() + video.name);
        uploadBytesResumable(videoRef, video)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {
                    await updateDoc(res, {
                        video: url
                    });
                });
            }).catch((error) => {
                console.error('Upload failed', error);
            });

        reset()
    }

    return (
        <div className={AddFilmStyles.content}>
            <h1 className="text-center text-light">AddFilms</h1>
            <div className={AddFilmStyles.field}>
                <Form
                    onSubmit={handleSubmit(save)}
                    className={AddFilmStyles.form}
                    style={{ opacity: "0.60" }}
                >
                    {
                        errors.title &&
                        <p className="text-danger">
                            Please fill title
                        </p>
                    }
                    <Form.Group
                        className="w-100 mb-4"
                        controlId="formBasicTitle"
                    >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            {...register('title', { required: true })}
                        />
                    </Form.Group>

                    {
                        errors.description &&
                        <p className="text-danger">
                            Please fill Description
                        </p>
                    }
                    <Form.Group
                        className="mb-4"
                        controlId="formBasicDescription"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            style={{ height: '80px', resize: "none" }}
                            {...register('description', { required: true })}
                        />
                    </Form.Group>

                    {
                        errors.years &&
                        <p className="text-danger">
                            Please fill Years
                        </p>
                    }
                    <Form.Group
                        className="mb-4"
                        controlId="formBasicEmail"
                    >
                        <Form.Label>Years</Form.Label>
                        <Controller
                            name='years'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange } }) => (
                                <Select
                                    placeholder='Years'
                                    onChange={onChange}
                                    options={yearsOption}
                                />
                            )}
                        />
                    </Form.Group>
                    {
                        errors.genres &&
                        <p className="text-danger">
                            Please fill Genres
                        </p>
                    }
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicCountry"
                    >
                        <Form.Label>Genres</Form.Label>
                        <Controller
                            name='genres'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange } }) => (
                                <Select
                                    isMulti
                                    placeholder='Genres'
                                    onChange={onChange}
                                    options={genresOption}
                                />
                            )}
                        />
                    </Form.Group>
                    {
                        errors.translation &&
                        <p className="text-danger">
                            Please fill Translation
                        </p>
                    }
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                    >
                        <Form.Label>Translation</Form.Label>
                        <Controller
                            name='translation'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange } }) => (
                                <Select
                                    placeholder='Translation'
                                    onChange={onChange}
                                    options={translationOption}
                                />
                            )}
                        />
                    </Form.Group>

                    {
                        errors.producer &&
                        <p className="text-danger">
                            Please fill Producer
                        </p>
                    }
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicProducer"
                    >
                        <Form.Label>Producer</Form.Label>
                        <Controller
                            name='producer'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange } }) => (
                                <Select
                                    placeholder='producer'
                                    onChange={onChange}
                                    options={producerOption}
                                />
                            )}
                        />
                    </Form.Group>

                    {errors.actors && <p className="text-danger">Please fill Actors</p>}
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicActors"
                    >
                        <Form.Label>Actors</Form.Label>
                        <Controller
                            name='actors'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange } }) => (
                                <Select
                                    isMulti
                                    placeholder='Actors'
                                    onChange={onChange}
                                    options={actorsOption}
                                />
                            )}
                        />
                    </Form.Group>

                    {errors.actors && <p className="text-danger">Please fill Actions</p>}
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicActions"
                    >
                        <Form.Label>Country</Form.Label>
                        <Controller
                            name='country'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange } }) => (
                                <Select

                                    placeholder='Country'
                                    onChange={onChange}
                                    options={countryOption}
                                />
                            )}
                        />
                    </Form.Group>

                    {
                        errors.time &&
                        <p className="text-danger">
                            Please fill Time
                        </p>
                    }
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicTime"
                    >
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="time"
                            placeholder="Time"
                            {...register('time', { required: true })}
                        />
                    </Form.Group>


                    {errors.photo && <p className="text-danger">
                        Please fill Photo
                    </p>}
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicPhoto"
                    >
                        <Form.Label>Photo</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Photo"
                            {...register('photo', { required: true })}
                        />
                    </Form.Group>
                    {errors.video && <p className="text-danger">
                        Please fill Video
                    </p>}
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicPhoto"
                    >
                        <Form.Label>Video</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Photo"
                            {...register('video')}
                        />
                    </Form.Group>
                    <Button
                        variant="light"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}