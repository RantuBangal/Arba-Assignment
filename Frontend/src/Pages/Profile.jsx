import React, { useState } from "react";
import style from "../CSS/profile.module.css";
import btn from "../CSS/Button.module.css";
import Terms from "../Components/Terms";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, FormControl, FormLabel } from "@chakra-ui/react";

function Profile() {
  const [show , setShow] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdateProfile = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/user/profile/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName,
          password: password,
        }),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        alert('Profile updated')
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
    setShowModal(false);
  };
  

  const avatar = localStorage.getItem("avatar");
  const userName = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const Name = localStorage.getItem("name")

  return (
    <div>
      <div className={style.profile}>
        <img src={avatar} alt="Profile" />
        <h3>{Name}</h3>
        <h3>{userName}</h3>
        <p>{email}</p>
      </div>
      <div className={style.line}></div>
      <div className={style.btn}>
        <div
          className={btn.btmbtn}
          onClick={() => setShow(true)}
          style={{ cursor: "pointer" }}
        >
          See T&C
        </div>
        <div
          className={btn.btmbtn}
          style={{ marginLeft: "5px", cursor: "pointer" }}
          onClick={handleUpdateProfile}
        >
          Update Profile
        </div>
      </div>
      {/* Chakra UI Modal */}
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>Submit</Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Terms */}
      {show && <Terms />}
    </div>
  );
}

export default Profile;
