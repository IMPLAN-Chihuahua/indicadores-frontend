import React, { useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Grid,
  IconButton,
  Chip,
  DialogTitle,
  Tooltip,
  useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { useObjetivos } from '../services/objetivoService';
import FormDialog from '../components/dashboard/common/FormDialog';
import { FormDimension } from '../components/dashboard/forms/dimension/FormDimension';

const Objetivos = () => {
  const { objetivos } = useObjetivos();
  const [openModal, setOpenModal] = useState(false);
  const [selectedObjetivo, setSelectedObjetivo] = useState(null);

  const handleEdit = (objetivo) => {
    setSelectedObjetivo(objetivo);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedObjetivo(null);
  };

  return (
    <Box sx={{ p: 4, maxWidth: '1400px', margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 6, fontWeight: 600, color: '#2d3436', letterSpacing: '-0.5px' }}>
        Objetivos Estratégicos
      </Typography>

      <Grid container spacing={4}>
        {objetivos.map((o) => (
          <Grid item xs={12} key={o.id}>
            <ObjetivoCard
              objetivo={o}
              onEdit={handleEdit}
            />
          </Grid>
        ))}
      </Grid>

      <FormDialog
        open={openModal}
        handleClose={handleCloseModal}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Editar Objetivo</DialogTitle>
        {selectedObjetivo && (
          <FormDimension
            selectedObjetivo={selectedObjetivo}
            handleCloseModal={handleCloseModal}
            action='edit'
          />
        )}
      </FormDialog>
    </Box>
  )
};

const ObjetivoCard = ({ objetivo, onEdit }) => {
  const { titulo, descripcion, urlImagen, color, indicadoresCount } = objetivo;
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'grey.200',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        backgroundColor: 'transparent',
        '&:hover': {
          borderColor: 'transparent',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)'
        },
        minHeight: 200,
      }}
    >
      <Box sx={{
        width: { xs: '100%', md: '30%' },
        position: 'relative',
        overflow: 'hidden'
      }}>
        <CardMedia
          component="img"
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease',
            '&:hover': { transform: 'scale(1.03)' }
          }}
          image={urlImagen}
          alt={titulo}
        />
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: color,
          opacity: 0.05,
          pointerEvents: 'none'
        }} />
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: { xs: '100%', md: '70%' },
        p: { xs: 3, md: 4 },
        justifyContent: 'space-between'
      }}>

        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                color: '#2d3436',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.3
              }}
            >
              {titulo}
            </Typography>

            <Tooltip title="Editar" arrow>
              <IconButton
                onClick={() => onEdit(objetivo)}
                size="small"
                sx={{
                  ml: 2,
                  color: 'text.secondary',
                  '&:hover': { color: color, bgcolor: `${color}10` }
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.7,
              mb: 3,
              maxWidth: '90%',
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
          >
            {descripcion}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Chip
            icon={<AssessmentOutlinedIcon style={{ color: color, fontSize: '1.1rem' }} />}
            label={`${indicadoresCount} Indicadores`}
            size="small"
            sx={{
              fontWeight: 600,
              bgcolor: 'transparent',
              color: 'text.primary',
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: '6px',
              height: '28px',
              '& .MuiChip-label': { px: 1.5, fontSize: '0.75rem' }
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default Objetivos;