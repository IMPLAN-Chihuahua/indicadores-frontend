import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import DatagridTable from '../components/dashboard/common/DatagridTable'
import FormModal from '../components/dashboard/common/FormModal'

export const Modules = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => setOpenModal(prev => !prev);
  return (
    <>
      <div>
        <Button onClick={handleModal}>Click me</Button>
        <Button onClick={handleModal}>Click me</Button>
      </div>
      <FormModal open={openModal} setOpenModal={setOpenModal} title={'Editar módulo'}>
        <Typography sx={{ color: 'black', fontWeight: 'bold' }}>
          Hello worldaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaworldaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaworldaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaworldaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaworldaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </Typography>
      </FormModal>
    </>
  )
}
