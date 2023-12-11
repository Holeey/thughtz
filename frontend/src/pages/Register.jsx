import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice.js";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, 
    isLoading, 
    isError, 
    isSuccess, 
    message 
  } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess,message, navigate, dispatch])

  const handleChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  
    if (password !== password2) {
      toast.error('passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
    }
  }
  
  if(isLoading) {
    return <h1 className="loading">Loading...</h1>
  }

  return (
    <>    <section className="form_section">
      <section className="registerBanner">
        <h1>
          <FaUser size={17} /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      
  
        <form className="registerForm" onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />
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
          <input
            type="password"
            id="password2"
            value={password2}
            placeholder="Confirm your password"
            onChange={handleChange}
            required
          />
          <div className="btn_btn">
            <button type="submit" >Sign Up</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
