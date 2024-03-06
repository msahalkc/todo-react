import React, {useState, useEffect} from 'react'
import styles from '../Signup/Signup.module.css'
import { Link,useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(
    {
      email: '',
      password:'',
    }
  )

  useEffect(()=>{
    if(localStorage.getItem('loggedInUser')){
      navigate("/todo")
    }
  })

  const loginUser = () => {
    let userDatas = JSON.parse(localStorage.getItem('userDatas'))
    if(!userDatas){
      userDatas = []
    }
    if(userDatas.some((obj)=> obj.email==userData.email && obj.password == userData.password)){
      
      const user = userDatas.filter((obj)=>obj.email==userData.email)[0]
      
      localStorage.setItem("loggedInUser", JSON.stringify(user))
      navigate('/todo')
    }else{
      alert("failed to login")
    }
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <input
          type="email"
          required
          value={userData.email}
          onChange={(e) => {setUserData({...userData, email: e.target.value})}}
          placeholder='Enter your Email Address'
          className={styles.userEmailInput}
        />
        <input
          type="password"
          required
          value={userData.password}
          onChange={(e) => {setUserData({...userData, password: e.target.value})}}
          placeholder='Enter your Account Password'
          className={styles.userPasswordInput}
        />
        <button onClick={loginUser} className={styles.submitButton}>
          Login
        </button>
      </div>
      <Link to='/signup'>
        <p className={styles.link}>Don't an account? Signup Now!</p>
      </Link>
    </div>
  )
}

export default Login