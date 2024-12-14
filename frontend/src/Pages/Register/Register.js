import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
import './Register.css'
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== password2) {
      alert("Passwords don't match!");
      return;
    }

    axios.post('http://localhost:8000/api/register/', { username, email,password, password2 })
      .then(response => {
        console.log(response.data);
        navigate('/login');
      })
      .catch(error => {
        console.error('There was an error registering!', error);
      });
  };

  return (
    <div className='bodyR'>

      <div className="main">  	

			<div className="signup">
				<form className='fR' onSubmit={handleSubmit}>
					<label className='labelR'  aria-hidden="true">Sign up</label>
					<input className='inputR' type="text" name="txt" placeholder="User name" value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required />
					<input className='inputR' type="email" name="email" placeholder="Email"   value={email} 
          onChange={(e) => setEmail(e.target.value)}  
          required />
          <input className='inputR' 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <input  className='inputR'
          type="password" 
          placeholder="Confirm Password" 
          value={password2} 
          onChange={(e) => setPassword2(e.target.value)} 
          required 
        />
					<button className='buttonR' type="submit">Sign up</button>
				</form>
        <p className='loginH'>Already have an account? <Link className='TloginH' to="/login">Login here</Link></p>
			</div>

          
      </div>
    </div>
  );
};

export default Register;
