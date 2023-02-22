import { onAuthStateChanged } from "firebase/auth"
import { collection } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { getDocs, query, where } from "firebase/firestore"
import { Navigate, Outlet } from "react-router-dom"
import { userFunc } from "../../features/films/filmsSlice"
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { auth, db } from "../../firebase.config"

export const AuthLayout: React.FC = (): JSX.Element => {

    const [response, setResponse] = useState(false)
    const userCollection = collection(db, "users")
    const userFilms = collection(db, "films")
    const dispatch = useAppDispatch()
    const { user, films } = useAppSelector(state => state.films)
    console.log(user);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                let q: any = query(userCollection, where("userid", "==", user.uid))
                let data: any = await getDocs(q)
                console.log(data)
                setResponse(true)
                if (data.size > 0) {
                    data = data.docs[0]
                    dispatch(userFunc({ id: data.id, ...data.data() }))
                }
            } else {
                setResponse(true)
            }
        })
    }, [])

    if (response) {
        if ("id" in user) {
            return (<>
                <Outlet />
            </>)
        }
        else {
            return <Navigate to={"/"} />
        }
    }
    else return (
        <></>
    )
}