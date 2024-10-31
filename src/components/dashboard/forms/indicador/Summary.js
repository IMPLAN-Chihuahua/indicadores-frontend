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
    return <ErrorContent error={formState.error} justifyContent='center' />
  }

  return (
    <Box>
      <Typography>
        A continuación se muestra un resumen de la información que ingresaste en los pasos anteriores.
        Si todo está correcto, da clic en terminar para crear el indicador.
      </Typography>

      <SummarySection title={indicador.nombre}>
        <Typography>
          <SemiboldSpan content={'Último valor disponible:'} /> {indicador.ultimoValorDisponible}{indicador.adornment} ({indicador.anioUltimoValorDisponible})
        </Typography>
        <Typography>
          <SemiboldSpan content={'Definición:'} /> {indicador.definicion}
        </Typography>
        <Typography>
          <SemiboldSpan content={'Periodicidad:'} /> {indicador.periodicidad} meses
        </Typography>
        <Typography>
          <SemiboldSpan content={'Unidad de medida:'} /> {indicador?.medida || 'NA'}
        </Typography>
        <Typography>
          <SemiboldSpan content={'Cobertura geográfica:'} /> {indicador?.cobertura?.tipo || 'NA'}
        </Typography>
        <Typography>
          <SemiboldSpan content={'Objetivo desarrollo sostenible:'} /> {indicador?.ods?.titulo || 'NA'}
        </Typography>
      </SummarySection>
      <SummarySection title='Formula'>
        <Typography><SemiboldSpan content={'Descripción:'} /> {indicador.formula.descripcion}</Typography>
        <Typography>
          <SemiboldSpan content={indicador.hasEcuacion ? 'Ecuación:' : 'Origen'} /> {
            indicador.hasEcuacion ? <MathJax inline>{`\\(${indicador.formula.ecuacion}\\)`}</MathJax> :
              indicador.formula.ecuacion
          }
        </Typography>
        {
          variables.length > 0 && (
            <>
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
                        <TableCell>{v.variableDesc}</TableCell>
                        <TableCell>{v.medida}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </>
          )
        }
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
    <Box component='section' sx={{ my: 3 }}>
      <Typography variant='h6' component='h4'>{title}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '8px' }}>
        {children}
      </Box>
    </Box>
  )
};

const SemiboldSpan = ({ content }) => {
  return (
    <Typography component='span' fontWeight={500}>{content}</Typography>
  );
}