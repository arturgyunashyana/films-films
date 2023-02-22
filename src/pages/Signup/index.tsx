import { useForm } from "react-hook-form"
import { createUserWithEmailAndPassword } from "firebase/auth";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useState } from "react";
import { User } from "../../types/users";
import SignUpStyles from "./signup.module.css"

export const Signup: React.FC = (): JSX.Element => {

    const [error, setError] = useState<string>("")

    const userCollection = collection(db, "users")
    console.log(userCollection)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<User>();

    const save = (data: User): void => {
        console.log(data);
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (res) => {
                console.log(res)
                await addDoc(userCollection, {
                    name: data.name,
                    surname: data.surname,
                    age: data.age,
                    userid: res.user.uid
                })
                setError("")
                reset()
            })
            .catch(err => {
                setError(err.message)
            })
        reset()
    }

    return (
        <div className={SignUpStyles.signup}>
            <h1
                className="pt-3 text-center text-light"
            >
                Registration
            </h1>
            <Form
                onSubmit={handleSubmit(save)}
                className={SignUpStyles.form}
                style={{ opacity: "0.70" }}
            >
                {errors.name && <p className="text-danger">Please fill Name</p>}
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        {...register('name', { required: true })}
                    />
                </Form.Group>

                {errors.surname && <p className="text-danger">Please fill SurName</p>}
                <Form.Group className="mb-3" controlId="formBasicSurName">
                    <Form.Label>SurName</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="SurName"
                        {...register('surname', { required: true })}
                    />
                </Form.Group>

                {errors.age && <p className="text-danger">Please fill Age</p>}
                <Form.Group className="mb-3" controlId="formBasicAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Age"
                        {...register('age', { required: true })}
                    />
                </Form.Group>

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
                    type="submit"
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}