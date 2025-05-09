import {useState, useEffect} from 'react'
import { PostCard, Container } from '../components'
import service from '../appwrite/config'
const AllPosts = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
      service.showPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
      })
    }, [])

    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => {
                  console.log(post)
                  return (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard post={post} />
                    </div>
                )})}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts