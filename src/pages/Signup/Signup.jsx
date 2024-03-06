import React, {useState, useEffect} from 'react'
import styles from './Signup.module.css'
import { Link,useNavigate } from 'react-router-dom'

const Signup = () => {
  const [userData, setUserData] = useState(
    {
      name: '',
      email: '',
      password:'',
    }
  )

  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('loggedInUser')){
      navigate("/todo")
    }
  },[])

  const storeData = () => {
    let userDatas = JSON.parse(localStorage.getItem('userDatas')) || []
    
    if(userDatas.some((obj)=> obj.email==userData.email)){
      alert('user exists!')
      return
    }
    userDatas.push(userData)
    localStorage.setItem("userDatas", JSON.stringify(userDatas))
    navigate('/login')
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <input
          type="text"
          required
          value={userData.name}
          onChange={(e) => {setUserData({...userData, name: e.target.value})}}
          placeholder='Enter your Full Name'
          className={styles.userFullNameInput}
        />
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
        <button onClick={storeData} className={styles.submitButton}>
          SignUp
        </button>
      </div>
      <Link to='/login'>
        <p className={styles.link}>Already have an account? Login Now!</p>
      </Link>
    </div>
  )
}

export default Signup