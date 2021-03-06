import React, { useState } from 'react'
import classes from './LoginPage.module.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { connect } from 'react-redux'
import { editAuth, editUser } from '../../redux/actions'
import AuthProvider from '../Api/Auth/AuthProvider'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

function LoginPage({ editAuth, editUser }) {

    const [value, setValue] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        let val = e.target.value
        let nam = e.target.name
        setValue({ ...value, [nam]: val })
    }

    const history = useHistory()


    const handleSubmit = (e) => {
        e.preventDefault()

        AuthProvider.login(value)
            .then((res) => {
                editAuth(true)
                const currentUser = {
                    name: res.userName,
                    email: res.userEmail,
                    id: res.userId,
                    avatar: res.avatar,

                }
                editUser(currentUser)
                history.push('/')
            })
            .catch(err => {
                AuthProvider.checkError(err)
            })
    }

    return (
        <div className={classes.loginPageContainer}>
            <form className={classes.loginPageWrapper} onSubmit={handleSubmit}>
                <div className={classes.row}>
                    <p className={classes.title}>Sign in or </p>
                    <Link to="/register" className={classes.link}>register</Link>
                </div>
                <div className={classes.inputBox}>
                    <TextField
                        className={classes.input}
                        id="name"
                        name="name"
                        label="Name"
                        variant="standard"
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.inputBox}>
                    <TextField
                        className={classes.input}
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        variant="standard"
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.inputBox}>
                    <TextField
                        className={classes.input}
                        id="password"
                        name="password"
                        label="Password"
                        variant="standard"
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.btnBox}>
                    <Button
                        className={classes.btn}
                        variant="contained"
                        type="submit">
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    editAuth: editAuth,
    editUser: editUser
}


export default connect(null, mapDispatchToProps)(LoginPage)
