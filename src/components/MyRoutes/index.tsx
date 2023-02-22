import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AddFilm } from "../../pages/AddFilm"
import { Admin } from "../../pages/Admin"
import { FilmDetails } from "../../pages/FilmDetails"
import { Home } from "../../pages/Home"
import { Profile } from "../../pages/Profile"
import { Signin } from "../../pages/Signin"
import { Signup } from "../../pages/Signup"
import { AuthLayout } from "../AuthLayout"
import { Layout } from "../Layout"

export const MyRoutes: React.FC = (): JSX.Element => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="signin" element={<Signin />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="admin" element={<Admin />} />
                        <Route path="filmdetails/:id" element={<FilmDetails />} />
                        <Route path="" element={<Home />} />
                        <Route path="" element={<AuthLayout />}>
                            <Route path="profile" element={<Profile />} />
                            <Route path="addfilm" element={<AddFilm />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}