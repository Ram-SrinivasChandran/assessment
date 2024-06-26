import { React, useEffect, useState } from "react";
import {  Modal,Input, Button } from "antd";



const EditUseModal = ({ user,closeModal,open,updateUserHandler}) => {

  console.log("user",user)

    const [name,setName] = useState(user?.name || '')
    const [email,setEmail] = useState(user?.email || '')

    const [error,setError] = useState(null)

    const updateHandler = (e) =>{
      e.preventDefault();
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      console.log('regex.test(email)',regex.test(email))
      if ((!name || !email)) return;
  
      if(regex.test(email)){
        setError(null)
        console.log("email",email,"name",name)
        updateUserHandler({
          id:user?.id,email,name
        })
        setEmail('');
        setName('')
      }else{
        console.log('setting')
        setError('Enter valid email')
      }
    }

    useEffect(() =>{
      setName(user?.name)
      setEmail(user?.email)
    },[user])

    return (
        <Modal open={open}  title="Edit User" onCancel={closeModal} 
        footer={[
          <Button key="back" onClick={closeModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={updateHandler}>
            Update
          </Button>,
         
        ]}
        >
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

        </Modal>
    )
}

export default EditUseModal;
