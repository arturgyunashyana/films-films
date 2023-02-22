import { useEffect, useState } from "react"
import ProfileStyles from "./profile.module.css"
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { userFunc } from "../../features/films/filmsSlice";

export const Profile: React.FC = (): JSX.Element => {

    const { user } = useAppSelector(state => state.films)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    console.log(user);

    return (
        <>
            <div className={ProfileStyles.profile}>
                <div className={ProfileStyles.content}>
                    <div>Name</div>
                    <h2>{user.name}</h2>
                    <div>SurName</div>
                    <h2>{user.surname}</h2>
                    <div>Age</div>
                    <strong className="fs-5">{user.age}</strong>
                    <div className="mt-3">
                        <button
                            className="btn btn-info"
                            onClick={() => {
                                signOut(auth)
                                dispatch(userFunc({}))
                                navigate("/")
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}