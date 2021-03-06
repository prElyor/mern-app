import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import classes from './AppTable.module.css'
import AuthProvider from '../../Api/Auth/AuthProvider'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import { useToaster } from '../../hooks/useToaster'
import AlertDialogSlide from '../../Dialog/Dialog'

function AppTable({
    addBtnText,
    basePath,
    targetList,
    tableHeadings,
    rowCells
}) {

    const setToaster = useToaster

    const [items, setItems] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [dialogText, setDialogText] = useState('')
    const history = useHistory()
    const isSmall = useMediaQuery('(max-width:992px)');

    const getItems = () => {
        targetList.get()
            .then(res => {
                setItems(res.data.items)
            })
            .catch(err => {
                AuthProvider.checkError(err)
            })
    }

    const EditIcons = ({ id }) => {
        return (
            <Button className={classes.buttonTable} onClick={e => history.push(`${basePath}/${id}`)}>
                <EditIcon />
            </Button>
        )
    }

    const deleteRow = (id) => {
        if (targetList.delete) {
            targetList.delete(id)
                .then(res => {
                    setToaster(res.data.message, 'success')
                    getItems()
                }).catch(err => {
                    AuthProvider.checkError(err)
                })
        }
    }

    const DeleteIcons = ({ id }) => {
        return (
            <Button className={classes.buttonTable} onClick={e => deleteRow(id)}>
                <DeleteIcon />
            </Button>
        )
    }

    const downloadRow = (id, name, type) => {
        if (targetList.download) {
            targetList.download(id)
                .then(res => {
                    downloadFiles(res, name, type)
                }).catch(err => {
                    AuthProvider.checkError(err)
                })
        }
    }

    function downloadFiles(response, name, type) {
        const url = window.URL
            .createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${name}.${type}`)
        document.body.appendChild(link)

        link.click()
        document.body.removeChild(link)
    }

    const DownloadIcons = ({ id, name, type }) => {
        return (
            <Button className={classes.buttonTable} onClick={e => downloadRow(id, name, type)}>
                <CloudDownloadIcon />
            </Button>
        )
    }

    const handleSlideClick = (description) => {
        setDialogText(description)
        setOpenDialog(true)
    }


    const DescriptionIcon = ({ description }) => {
        return (
            <Button className={classes.buttonTable} onClick={e => handleSlideClick(description)}>
                <VisibilityIcon />
            </Button>
        )
    }

    const drawCell = (row, cell) => {
        switch (cell.type) {
            case 'text':
                let cellText = row[cell.key]
                return cellText
            case 'date':
                let timeStamp = new Date(row[cell.key])
                const addZero = (datePart) => datePart.toString().padStart(2, '0')
                let dateValue = `${addZero(timeStamp.getDate())}.${addZero(timeStamp.getMonth() + 1)}.${timeStamp.getFullYear()}`
                let timeValue = `${addZero(timeStamp.getHours())}:${addZero(timeStamp.getMinutes())}`

                return dateValue + ' ' + timeValue
            case 'link':
                let cellLink = row[cell.key]
                return <div className={classes.links}><a href={cellLink} target="_blank" rel="noreferrer">{cellLink}</a></div>
            case 'actions':
                return (
                    <>
                        <DescriptionIcon description={row.description} />
                        <EditIcons id={row._id} />
                        <DeleteIcons id={row._id} />
                    </>
                )
            case 'downloadActions':
                return (
                    <>
                        <DescriptionIcon description={row.description} />
                        <EditIcons id={row._id} />
                        <DeleteIcons id={row._id} />
                        <DownloadIcons id={row._id} name={row.name} type={row.type} />
                    </>
                )
            case 'description':
                return (
                    <>
                        <DescriptionIcon description={row.description} />
                    </>
                )
            default:
                return <></>
        }
    }

    useEffect(() => {
        getItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const SmallLayout = () => {

        return (
            <>
                {
                    items.map(row => {
                        return (
                            <ul className={classes.smallLayoutList} key={row._id + Math.random() * 100}>
                                <li className={classes.smallLayoutListItem}>
                                    {tableHeadings.map((heading, index) => {
                                        return (
                                            <div className={classes.rowSmallLayout} key={row._id + Math.random() * 100 + `${Date.now()}`}>
                                                <div className={classes.headingNameTable}>
                                                    {heading.name}:
                                                </div>
                                                <div
                                                    className={classes.row}
                                                >
                                                    {drawCell(row, rowCells[index])}
                                                </div>
                                            </div>
                                        )
                                    })}

                                </li>
                            </ul>
                        )

                    })
                }
            </>
        )

    }

    return (
        <div className={classes.pageContainer}>
            <div className={classes.btnWrapper}>
                <Button
                    variant="contained"
                >
                    <Link
                        to={`${basePath}/create`}
                        className={classes.addBtnLink}
                    >
                        {addBtnText}
                    </Link>
                </Button>
            </div>
            <div className={classes.tablewrapper}>
                {items.length < 1 ? <div>No data</div> :
                    !isSmall ?
                        <TableContainer component={Paper}>
                            <Table aria-label="">
                                <TableHead>
                                    <TableRow>
                                        {tableHeadings.map(headCell => {
                                            return (
                                                <TableCell
                                                    align={headCell.align}
                                                    style={{ color: headCell.color, width: headCell.width }}
                                                    key={headCell.name + Math.random() * 100}
                                                >
                                                    {headCell.name}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map(row => {
                                        return (
                                            <TableRow
                                                key={row._id}
                                            >
                                                {rowCells.map(cell => {
                                                    return (
                                                        <TableCell
                                                            style={{ color: cell.color, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                                                            align={cell.align}
                                                            key={row._id.toString() + Math.random() * 1000}
                                                        >
                                                            {drawCell(row, cell)}
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        : <SmallLayout />
                }
            </div>

            <AlertDialogSlide openDialog={openDialog} setOpenDialog={e => setOpenDialog(e)} dialogText={dialogText} />

        </div>
    )
}

export default AppTable
