import React from 'react'
import LayOut from '../../components/LayOut'
import PostFormcard from '../../components/PostFormCard'
import PostCard from '../../components/PostCard'
import { useEffect } from 'react'
import { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Home() {

    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[])
    return (
            <LayOut page='home'>
                <div className='flex'>
                    <div >
                        <PostFormcard />
                        <PostCard />
                    </div>
                </div>
            </LayOut>
            
    )
}

export default Home