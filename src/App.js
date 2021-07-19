import './App.css';
import React,{useState} from 'react';
import fire from './Fire';

function App() {
  const [date, setDate] = useState("");
  const [fullname, setFulln] = useState("");
  const [addr, setAddr] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");
  const [reason, setReasom] = useState("");
  
  const [errors, setErrors] = useState({});
  
  const HandleSubmit = (e)=>{
    e.preventDefault();
    const isValid = formValidation();
    if(isValid){
      let msg = fire.database().ref('successful').orderByKey().limitToLast(10000);
      fire.database.ref('successful').push({fullname},{date}, {addr}, {email}, {reason}, {phno});
      setDate("");
      setFulln("");
      setEmail("");
      setAddr("");
      setReasom("");
      setPhno("")
    }
  }

  const formValidation = (e)=>{
    let errors = {};
    let isVal = true;
    if(fullname.trim().length == 0){
      errors.name = "Full Name is required";
      isVal = false;
    }
    if(email.trim().length == 0){
      errors.email = "Email Entry is required";
      isVal = false; 
    }
    else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
      errors.email = "Email is invalid";
      isVal = false;
    }
    console.log(email);
    if(addr.trim().length == 0){
      errors.addr = "Address Field is empty";
      isVal= false;
    }
    if(phno.trim().length == 0){
      errors.phno = "Contact number is not provided";
      isVal= false;
    }
    else if(!/^[7-9][0-9]{9}$/.test(phno)){
      errors.phno = "Contact number is invalid";
      isVal = false;
    }
    if(reason.trim().length == 0){
      errors.reason = "Reason field is empty";
      isVal= false;
    }
    setErrors(errors);
    return isVal;
  }
  return (
    <div className="App">
      <form onSubmit={HandleSubmit}>
        <label>Date:</label>
        <input type="date" required value={date} onChange={(e)=>{setDate(e.target.value)}} /><br/>
        <label>Fullname:</label>
        <input type="text" value={fullname} onChange={(e)=>{setFulln(e.target.value)}} /><br/>
        {errors.name && <div style={{color:"red"}}>{errors.name}</div>} 
        <label>Reason:</label>
        <input type="text" value={reason} onChange={(e)=>{setReasom(e.target.value)}} /><br/>
        {errors.reason && <div style={{color:"red"}}>{errors.reason}</div>} 
        <label>Email:</label>
        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} /><br/>
        {errors.email && <div style={{color:"red"}}>{errors.email}</div>} 
        <label>Address:</label>
        <input type="text" value={addr} onChange={(e)=>{setAddr(e.target.value)}} /><br/>
        {errors.addr && <div style={{color:"red"}}>{errors.addr}</div>} 
        <label>Contact Number:</label>
        <input type="tel" value={phno} onChange={(e)=>{setPhno(e.target.value)}} /><br/>
        {errors.phno && <div style={{color:"red"}}>{errors.phno}</div>} 
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
