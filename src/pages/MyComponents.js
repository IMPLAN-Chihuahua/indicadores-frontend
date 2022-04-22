import React from 'react'
import FormDelete from '../components/common/FormDelete';
import FormDialog from "../components/dashboard/common/FormDialog";

export const MyComponents = () => {
  const [removeOpenModal, setRemoveOpenModal] = React.useState(false);
  const handleRemoveOpenModal = () => setRemoveOpenModal(true);
  const handleRemoveCloseModal = () => setRemoveOpenModal(false);

  return (
    <>                  
      <button onClick={handleRemoveOpenModal}>Test Modal</button>
      <FormDialog
        open={removeOpenModal}
        setOpenModal={setRemoveOpenModal}
      >
        <FormDelete handleCloseModal={handleRemoveCloseModal} />
      </FormDialog>
    </>
  )
}

