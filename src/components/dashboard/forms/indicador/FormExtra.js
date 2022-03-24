import { useSelector } from "react-redux";

export const FormExtra = () => {
  const formIndicadorData = useSelector((state) => state.indicadores);
  return (
    <>
      Form Extra
      <pre>

        {JSON.stringify(formIndicadorData, null, 2)}
      </pre>
    </>
  );
};