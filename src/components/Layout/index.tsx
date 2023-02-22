import { useState } from "react"
import LayoutStyles from "./layout.module.css"
import { NavLink, Outlet } from "react-router-dom"
import Bar from "../../assets/bar.svg"
import { useAppDispatch, useAppSelector } from "../../app/hook"

export const Layout: React.FC = (): JSX.Element => {

    const [bool, setBool] = useState(false)

    const dispatch = useAppDispatch()

    const { user } = useAppSelector(state => state.films)

    return (
        <>
            {
                user.admin === true ?
                    <>
                        <nav>
                            <ul className={bool ? LayoutStyles.active__nav : null}>
                                <li>
                                    <NavLink to={"profile"}>
                                        Admin
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"addfilm"}>
                                        addfilm
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="signin">
                                        Signin
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"edit"}>
                                        Edit
                                    </NavLink>
                                </li>
                                <div
                                    className={LayoutStyles.close}
                                    onClick={() => setBool(false)}
                                >
                                    &times;
                                </div>
                            </ul>
                            <div
                                className={LayoutStyles.bar}
                                onClick={() => setBool(!bool)}
                            >
                                <img
                                    src={Bar}
                                    alt={Bar}
                                />
                            </div>
                        </nav>
                    </>
                    :
                    <nav>
                        <ul className={bool ? LayoutStyles.active__nav : null}>
                            <li>
                                <NavLink to={"/"}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"signin"}>
                                    SignIn
                                </NavLink>
                            </li>
                            <div
                                className={LayoutStyles.close}
                                onClick={() => setBool(false)}
                            >
                                &times;
                            </div>
                            <div
                                className={LayoutStyles.bar}
                                onClick={() => setBool(!bool)}
                            >
                                <img
                                    src={Bar}
                                    alt={Bar}
                                />
                            </div>
                        </ul>
                    </nav>
            }
            <Outlet />
        </>
    )
}