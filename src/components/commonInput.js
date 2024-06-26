import React, { useState } from "react";
import { Button,Input } from 'antd';


const InputHandler = ({ onSubmit, editMode = false }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error,setError]= useState(null)



  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log('regex.test(email)',regex.test(email))
    if ((!name || !email)) {
      setError('Name and Email are required.')
      return;
    }else if(regex.test(email)){
      setError(null)
      onSubmit({ name, email });
      setEmail('');
      setName('')
    }else{
      console.log('setting')
      setError('Enter valid email.')
    }
  };

  return (
    <div className="header-box">
      <Input
        value={name}
        className="field"
        type="text"
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Input
      value={email}
      className="field"
        type="text"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      {error && (
        <p className="error">{error}</p>
      )}
      {/* <button onClick={handleSubmit} className="button" type="primary">
        {!!editMode ? "Edit user" : "Add user"}
      </button> */}
      <Button onClick={handleSubmit} className="button" type="primary"> {!!editMode ? "Edit user" : "Add user"}</Button>
    </div>
  );
};

export default InputHandler;
