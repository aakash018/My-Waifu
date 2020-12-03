import React, { useEffect, useState } from 'react'
import { useDatabase } from '../../Context/DataBase'

function PostContainer() {

    const {getPosts} = useDatabase()
 

    return (
        <div>
            <img />
        </div>
    )
}

export default PostContainer
