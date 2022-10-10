import { Box, CircularProgress, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { useMemo } from "react";
import { useIndicadorContext } from "../../../../contexts/IndicadorContext";
import LocalImage from "../../../common/LocalImage";
import ErrorContent from "./ErrorContent";

export const Summary = () => {
  const { indicador, formState } = useIndicadorContext();
  const variables = useMemo(() => {
    return indicador.formula.variables
      .filter(v => v.nombre !== '')
  }, [indicador.formula]);

  if (formState.uploading) {
    return (
      <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </div>
    )
  }

  if (!formState.uploading && formState.error) {
    return <ErrorContent error={formState.error} />
  }

  return (
    <Box>
      <Typography variant='h5' component='h3'>Resumen</Typography>
      <Typography>
        A continuación se muestra un resumen de la información ingresada en los pasos anteriores.
        Si todo está correcto, da clic en terminar para crear el indicador.
      </Typography>

      <SummarySection title='General'>
        <Typography fontSize={20}>{indicador.nombre} ({indicador.codigo})</Typography>
        <Typography><SemiboldSpan content={'Tema:'} /> {indicador.tema.temaIndicador}</Typography>
        <Typography>
          <SemiboldSpan content={'Último valor disponible:'} /> {indicador.ultimoValorDisponible} •
          <SemiboldSpan content={' Año del último valor disponible:'} /> {indicador.anioUltimoValorDisponible}
        </Typography>
        <Typography>
          <SemiboldSpan content={'Periodicidad:'} /> {indicador.periodicidad} meses
        </Typography>
        <Typography>
          <SemiboldSpan content={'Unidad de medida:'} /> {indicador?.medida?.nombre || 'NA'}
        </Typography>
        <Typography>
          <SemiboldSpan content={'Cobertura geográfica:'} /> {indicador?.cobertura?.nombre || 'NA'}
        </Typography>
        <Typography>
          <SemiboldSpan content={'Objetivo desarrollo sostenible:'} /> {indicador?.ods?.nombre || 'NA'}
        </Typography>
        <Typography>
          <SemiboldSpan content={'Definición:'} /> {indicador.definicion}
        </Typography>
      </SummarySection>
      <SummarySection title='Formula'>
        <Typography><SemiboldSpan content={'Descripción:'} /> {indicador.formula.descripcion}</Typography>
        <Typography>
          <SemiboldSpan content={'Ecuación:'} /> <MathJax inline>{`\\(${indicador.formula.ecuacion}\\)`}</MathJax>
        </Typography>
        <Typography fontWeight={500}>Variables:</Typography>
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
                  <TableCell>{v.descripcion}</TableCell>
                  <TableCell>{v.medida.nombre}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </SummarySection>
      <SummarySection title='Mapa'>
        <Typography noWrap>
          <SemiboldSpan content={'URL ArcGIS:'} /> <Link target='_blank' href={indicador.mapa.url}>{indicador.mapa.url}</Link>
        </Typography>
        <Typography noWrap>
          <SemiboldSpan content={'Ubicación intranet:'} /> {indicador.mapa.ubicacion}
        </Typography>
        {indicador.mapa.image && (
          <Box width='400px'>
            <LocalImage file={indicador.mapa.image[0]} />
          </Box>
        )}
      </SummarySection>
      <SummarySection title='Extra'>
        <Typography><SemiboldSpan content={'Fuente:'} /> {indicador.fuente}</Typography>
        <Typography><SemiboldSpan content={'Observaciones:'} /> {indicador.observaciones}</Typography>
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

const SemiboldSpan = ({ content }) => {
  return (
    <span className='semibold'>{content}</span>
  );
}