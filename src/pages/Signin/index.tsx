import { useForm } from "react-hook-form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../types/users";
import { auth } from "../../firebase.config";
import SigninStyles from "./signin.module.css"

export const Signin: React.FC = (): JSX.Element => {

    const [error, setError] = useState<string>("")

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<User>();


    const save = (data: User): void => {
        signInWithEmailAndPassword(auth, data.email, data.password).then(user => {
            console.log(user)
            navigate("/profile")
        }).catch(err => {
            setError(err.message)
        })
        reset()
    }

    return (
        <div className={SigninStyles.signin}>
            <h1
                className="text-center text-light pt-5"
            >
                Login
            </h1>
            <Form
                className={SigninStyles.form}
                style={{ opacity: "0.80" }}
                onSubmit={handleSubmit(save)}
            >
                {errors.email && <p className="text-danger">Please fill Email</p>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        {...register('email', { required: true })}
                    />
                </Form.Group>

                {errors.password && <p className="text-danger">Please fill Password</p>}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        {...register('password', { required: true })}
                    />
                </Form.Group>
                <Button
                    variant="dark"
                    type="submit">
                    Submit
                </Button>
                <br />
                <Button
                    variant="success"
                    style={{marginTop: "20px"}}
                >
                    <Link
                        to="/signup/"
                        style={{color: "#fff", textDecoration: "none"}}
                    >
                        SignUp
                    </Link>
                </Button>
            </Form>
        </div>
    )
}