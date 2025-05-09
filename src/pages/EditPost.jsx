import React, {useState, useEffect} from 'react'
import {PostForm, Container} from '../components'
import service from '../appwrite/config'
import { useNavigate, useParams } from 'react-router'

const EditPost = () => {
    const [posts, setPosts] = useState(null)
    const {slug} = useParams()
    const naviagte = useNavigate()

    useEffect(() => {
      if (slug) {
        service.readPost(slug).then((post) => {
            if (post) {
                setPosts(post)
            }
        })
      }
      else{
        naviagte('/')
      }
    }, [slug])
    
  return posts?(
    <div className='py-8'>
        <Container>
            <PostForm post={posts} />
        </Container>
    </div>
  ) : null
}

export default EditPost