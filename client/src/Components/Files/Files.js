import React from 'react'
import { httpFilesDelete, httpFilesGet } from '../Api/utils/utils'
import AppBar from '../AppBar/AppBar'
import AppTable from '../Organizms/AppTable/AppTable'

function Files() {
    return (
        <>
            <AppBar />
            <AppTable
                    basePath = '/files'
                    addBtnText = 'Add File'
                    targetList = {{
                        get: httpFilesGet,
                        delete: httpFilesDelete
                    }}
                    tableHeadings = {[
                        {name: 'Name', color: '#000', align: 'left', width: '27%'},
                        {name: 'Created Data', color: '#000', align: 'left', width: '27%'},
                        {name: 'Updated Data', color: '#000', align: 'left', width: '27%'},
                        {name: 'Actions', color: '#000', align: 'center', width: '19%'}
                    ]}
                    rowCells = {[
                        {type: 'text', color: '#000', key: 'name', align: 'left'},
                        {type: 'date', color: '#000', key: 'createdAt', align: 'left'},
                        {type: 'date', color: '#000', key: 'updatedAt', align: 'left'},
                        {type: 'actions', color: '#000', align: 'center'},
                    ]} 
                    filters = {[]}
                />
        </>
    )
}

export default Files
