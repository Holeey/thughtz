import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
// import { toast } from "react-toastify"
import { FaSignInAlt } from "react-icons/fa";
import { login, reset } from "../features/auth/authSlice";


const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const { email, password } = formData;

      
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, 
    isLoading, 
    isError, 
    isSuccess, 
    // message 
  } = useSelector((state) => state.auth)

  useEffect(() => {
    // if (isError) {
    //   toast.error( 'Oops! sorry, network error' || message)
    // }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess,navigate, dispatch])
    
      const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
      }
    
      const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
          email,
          password
        }
        dispatch(login(userData)) 
    }

    if(isLoading) {
      return <h1 className="loading">Loading...</h1>
    }
    
      return (
        <>  
        <section className="form_section">
          <section className="loginBanner">
            <h1>
              Login <FaSignInAlt size={17}/>
            </h1>
            <p>Login and share your thughts...</p>
          </section>
          
        
            <form className="loginForm" onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
              <div className="btn_btn">
                <button type="submit">Login</button>
              </div>
            </form>
          </section>
        </>
      )
}

export default Login