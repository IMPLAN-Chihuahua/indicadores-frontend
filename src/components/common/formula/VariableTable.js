import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { MathJax } from "better-react-mathjax";

const VariableTable = (props) => {

  return (
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
          props?.variables.map((v, idx) => (
            <TableRow key={idx}>
              <TableCell><MathJax inline>{`\\(${v?.nombre}\\)`}</MathJax></TableCell>
              <TableCell>{v?.dato}</TableCell>
              <TableCell>{v?.anio}</TableCell>
              <TableCell>{v?.descripcion}</TableCell>
              <TableCell>{v?.catalogoDetail?.nombre || ''}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}

export default VariableTable;