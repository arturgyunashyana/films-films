import { async } from "@firebase/util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateProfile } from "firebase/auth";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { auth, db } from "../../firebase.config";
import { actorsType } from "../../types/actors";

export const feachCountryData = createAsyncThunk('country/get', async () => {
    const countryCollection = collection(db, 'country')
    let data = await getDocs(countryCollection)
    let arr: actorsType[] = []
    data.forEach((elm: any) => {
        let name = elm.data().name
        arr.push({ label: name, value: name })
    })
    return arr
})

export const feachYearsData = createAsyncThunk('years/get', async () => {
    const yearsCollection = collection(db, 'years')
    let data = await getDocs(yearsCollection)
    let arr: actorsType[] = []
    data.forEach((elm: any) => {
        let name = elm.data().name
        arr.push({ label: name, value: name })
    })
    return arr
})

export const feachProducersData = createAsyncThunk('producers/get', async () => {
    const producerCollection = collection(db, 'producers')
    let data = await getDocs(producerCollection)
    let arr: actorsType[] = []
    data.forEach((elm: any) => {
        let name = elm.data().name
        arr.push({ label: name, value: name })
    })
    return arr
})

export const feachTranslationData = createAsyncThunk('translation/get', async () => {
    const translationCollection = collection(db, 'translation')
    let data = await getDocs(translationCollection)
    let arr: actorsType[] = []
    data.forEach((elm: any) => {
        let name = elm.data().name
        arr.push({ label: name, value: name })
    })
    return arr
})

export const feachGenresData = createAsyncThunk('genres/get', async () => {
    const genresCollection = collection(db, 'genres')
    let data = await getDocs(genresCollection)
    let arr: actorsType[] = []
    data.forEach((elm: any) => {
        let name = elm.data().name
        arr.push({ label: name, value: name })
    })
    return arr
})

export const feachActorsData = createAsyncThunk('actors/get', async () => {
    const actorsCollection = collection(db, 'actors')
    let data = await getDocs(actorsCollection)
    let arr: actorsType[] = []
    data.forEach((elm: any) => {
        let name = elm.data().name
        arr.push({ label: name, value: name })
    })
    return arr
})

export const feachFilmsData = createAsyncThunk('films/get', async () => {
    const filmCollection = collection(db, 'films')
    let data = await getDocs(filmCollection)
    let arr: actorsType[] = []
    data.forEach((elm: any) => {
        arr.push({ id: elm.id, ...elm.data() })
    })
    return arr
})

export const feachSliderFilmsData = createAsyncThunk('sliderfilms/get', async (film: string | undefined) => {
    const filmCollection = collection(db, 'films')
    let q = query(filmCollection, orderBy("created", "desc"), limit(5))
    let data = await getDocs(q)
    let arr: actorsType[] = []
    data.forEach((elm: any) => {
        arr.push({ id: elm.id, ...elm.data() })
    })
    return arr
})

export const feachFilmDetalis = createAsyncThunk('film/get', async (id: string) => {
    const filmCollection = collection(db, 'films')
    let data = await getDoc(doc(db, 'films', id))
    if (data.exists()) {
        console.log(data.data());
        let film = { id: data.id, ...data.data() }
        return film
    } else {
        console.log("Document does not exist")
    }
})

export const filteredFilms = createAsyncThunk('filtered/get', async (genre: string | undefined) => {
    const filmCollection = collection(db, 'films')
    let q = query(filmCollection, where('genres', "array-contains", { value: genre, label: genre }))
    let data = await getDocs(q)
    let arr: actorsType[] = []
    data.forEach((elm: any) => {
        arr.push({ id: elm.id, ...elm.data() })
    })
    return arr
})

