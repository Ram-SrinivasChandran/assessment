import { Button, Modal, Table } from "antd";
import { React, useState } from "react";

import EditUseModal from "./EditUserModal";

const SimpleTable = ({ dataSource,deleteUser,updateUser }) => {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openEdituserModal, setOpenEditUserModal] = useState(false);

  const [currentUser,setCurrentUser] = useState(null)


  const deleteUserHandler = (user) =>{
    console.log("deleteUserHandler",user)
    deleteUser(user)
    setIsDeleteModalOpen(false)
  }

  const updateUserHandler = (user) =>{
    console.log("updateUserHandler",user)
    updateUser(user)
    setOpenEditUserModal(false)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <div style={{display:"flex"}}>
          

        <Button className="table-button" onClick={() => {setCurrentUser(record);
          setOpenEditUserModal(true)}}
          type="primary">
          Edit
        </Button>

        <Button className="table-button" onClick={() => {
          setCurrentUser(record);
          setIsDeleteModalOpen(true)
        }} type="primary" danger>
          Delete
        </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="table-container">
      <Modal title="Delete User" open={isDeleteModalOpen} onOk={() => deleteUserHandler(currentUser)} onCancel={() => setIsDeleteModalOpen(false)}>
        <p>Are you sure you want to delete this user?</p>
        <p>(This action cannot be undone)</p>
       
      </Modal>

    <EditUseModal user={currentUser} closeModal={() => setOpenEditUserModal(false)} open={openEdituserModal} updateUserHandler={updateUserHandler} />

      {dataSource.length ? (
        <>

          <Table style={{width:"50%"}} dataSource={dataSource} columns={columns} />

        </>
      ) : (
        "No user data"
      )}
    </div>
  );
};

export default SimpleTable;
