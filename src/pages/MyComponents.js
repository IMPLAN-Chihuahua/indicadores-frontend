import React from 'react'
import FormDelete from '../components/common/FormDelete';
import FormDialog from "../components/dashboard/common/FormDialog";

export const MyComponents = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>                  
      <button onClick={handleOpenModal}>Test Modal</button>
      

      
      <FormDialog
        open={openModal}
        setOpenModal={setOpenModal}
      >
        <FormDelete handleCloseModal={handleCloseModal} />
      </FormDialog>
    </>
  )
}

