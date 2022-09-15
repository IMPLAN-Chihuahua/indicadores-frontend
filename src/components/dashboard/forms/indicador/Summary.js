import { Box, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { useMemo } from "react";
import { useIndicadorContext } from "../../../../contexts/IndicadorContext";
import LocalImage from "../../../common/LocalImage";

export const Summary = () => {
  const { indicador } = useIndicadorContext();
  const variables = useMemo(() => {
    return indicador.formula.variables
      .filter(v => v.nombre !== '')
  }, [indicador.formula]);

  return (
    <Box>
      <Typography variant='h5' component='h3'>Resumen</Typography>
      <Typography>
        A continuación se muestra un resumen de la información ingresada en los pasos anteriores.
        Si todo está correcto, da clic en terminar para crear el indicador.
      </Typography>

      <SummarySection title='General'>
        <Typography fontSize={20}>{indicador.nombre} ({indicador.codigo})</Typography>
        <Typography>Tema: {indicador.tema.temaIndicador}</Typography>
        <Typography>
        Último valor disponible:
          <span style={{ fontWeight: 'bold' }}> {indicador.ultimoValorDisponible}</span> •
          Año del último valor disponible:
          <span style={{ fontWeight: 'bold' }}> {indicador.anioUltimoValorDisponible}</span>
        </Typography>
        <Typography>
        Periodicidad: {indicador.periodicidad} meses
        </Typography>
        <Typography>
        Unidad de medida: {indicador?.medida?.nombre || 'NA'}
        </Typography>
        <Typography>
        Cobertura geográfica: {indicador?.cobertura?.nombre || 'NA'}
        </Typography>
        <Typography>
        Objetivo desarrollo sostenible: {indicador?.ods?.nombre || 'NA'}
        </Typography>
        <Typography>
        Definición: {indicador.definicion}
        </Typography>
      </SummarySection>
      <SummarySection title='Formula'>
        <Typography>Descripción: {indicador.formula.descripcion}</Typography>
        <Typography>
          Ecuación: <MathJax inline>{`\\(${indicador.formula.ecuacion}\\)`}</MathJax>
        </Typography>
        <Typography>Variables:</Typography>
        <Table aria-label='Variables usadas en la ecuación'>
          <TableHead>
            <TableRow>
              <TableCell>Variable</TableCell>
              <TableCell>Dato</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Unidad de medida</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              variables.map((v, idx) => (
                <TableRow key={idx}>
                  <TableCell><MathJax inline>{`\\(${v.nombre}\\)`}</MathJax></TableCell>
                  <TableCell>{v.dato}</TableCell>
                  <TableCell>{v.anio}</TableCell>
                  <TableCell>{v.nombreAtributo}</TableCell>
                  <TableCell>{v.medida.nombre}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </SummarySection>
      <SummarySection title='Mapa'>
        <Typography>URL arcGIS: <Link target='_blank' href={indicador.mapa.url}>{indicador.mapa.url}</Link></Typography>
        Indicador cuenta con cartografía: {indicador.mapa.hasMapa ? 'Sí' : 'No'}
        {indicador.mapa.image && (
          <Box width='400px'>
            <LocalImage file={indicador.mapa.image[0]} />
          </Box>
        )}
      </SummarySection>
      <SummarySection title='Extra'>
        <Typography>Fuente: {indicador.fuente}</Typography>
        <Typography>Observaciones: {indicador.observaciones}</Typography>
        {indicador.image && (
          <Box width='400px'>
            <LocalImage file={indicador.image[0]} />
          </Box>
        )}
      </SummarySection>
    </Box>
  );
};

const SummarySection = ({ children, title }) => {
  return (
    <Box component='section' sx={{ margin: 3 }}>
      <Typography variant='h6' component='h4'>{title}</Typography>
      <Box sx={{ margin: 1, display: 'flex', flexDirection: 'column', rowGap: '8px' }}>
        {children}
      </Box>
    </Box>
  )
};