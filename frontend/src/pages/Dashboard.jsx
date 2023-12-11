import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import PostForm from "../components/header/posts/postForm"
import PostItem from "../components/header/posts/postItem"
import { getPosts, reset } from "../features/post/postSlice.js"
// import {toast} from 'react-toastify'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {posts, isLoading, isError} = useSelector((state) => state.posts)

  useEffect(() => {
    // if (isError) {
    //   toast.error('Oops, sorry, network error' || message)
    // }

    if (!user) {
       navigate('/login')
    }
 
    dispatch(getPosts())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch, isError])

  if (isLoading) {
    return <h1 className="loading">Loading...</h1>
  }
  return (
    <section className="dashboard_section">
    <div className="dashboard_banner">
      <h1>Welcome <span>{user && user.name}</span></h1>
      <p>share your thughtz!</p>
    </div>
    <section >
      <PostForm />
    </section>
    <section className="dashboard_post-section">
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
             <PostItem key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <span className="No-post_text">No posts yet...</span>
      )}
     
    </section>
    </section>


  )
}

export default Dashboard