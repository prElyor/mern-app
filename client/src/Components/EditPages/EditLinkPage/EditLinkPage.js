import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import AuthProvider from '../../Api/Auth/AuthProvider'
import { httpLinkPut, httpLinksGetById } from '../../Api/utils/utils'
import { useToaster } from '../../hooks/useToaster'
import classes from './EditLinkPage.module.css'

function EditLinkPage() {
    const [link, setLink] = useState('')
    const [id, setId] = useState('')
    const [description, setDescription] = useState('')

    const history = useHistory()

    const handleChange = (e) => {
        setLink(e.target.value)
    }

    const setToaster = useToaster

    const handleClick = async () => {
        let now = new Date()
        const params = {
            id: id,
            link: link,
            date: now,
            description: description
        }
        await httpLinkPut(params)
            .then(res => {
                setToaster(res.data.message, 'success')
                history.goBack()
            }).catch(err => {
                AuthProvider.checkError(err)
            })
    }

    const handleCancel = () => {
        history.go(-1)
    }

    const getLinkById = async () => {
        await httpLinksGetById(history.location.pathname)
            .then(res => {
                setLink(res.data.items.link)
                setId(res.data.items._id)
                setDescription(res.data.items.description)
            })
            .catch(err => {
                AuthProvider.checkError(err)
            })
    }

    useEffect(() => {
        getLinkById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history.location.pathname])

    return (
        <>
            <div className={classes.editLinkPageContainer}>
                <div className={classes.editLinkPageWrapper}>
                    <div className={classes.inputBox}>
                        <TextField
                            className={classes.input}
                            id="editLink"
                            name="editLink"
                            label="Link"
                            variant="standard"
                            value={link}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.inputBox}>
                        <TextField
                            className={classes.input}
                            id="editDescription"
                            name="editDescription"
                            label="Link"
                            variant="standard"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={classes.btnBox}>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            style={{background: '#afa6a6'}}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            onClick={handleClick}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditLinkPage