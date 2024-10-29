import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useCallback, useReducer, useState } from "react";
import { useAlert } from "../../../../contexts/AlertContext";
import { IndicadorProvider } from "../../../../contexts/IndicadorContext";
import useIsMounted from "../../../../hooks/useIsMounted";
import { createIndicador } from "../../../../services/indicatorService";
import { defaultVariable } from "../../components/home/Indicators/Formula/FormVariable";
import { FormFormula } from "../formula/FormFormula";
import { defaultMapa, FormMapa } from "../mapa/FormMapa";
import ErrorContent from "./ErrorContent";
import { FormBasic } from "./FormBasic";
import { FormExtra } from "./FormExtra";
import { HorizontalStepper } from "./HorizontalStepper";
import { Summary } from "./Summary";

const STEPS = [
  {
    idx: 0,
    label: 'Información básica',
    form: 'form-basic'
  }, {
    idx: 1,
    label: 'Formula',
    form: 'form-formula'
  }, {
    idx: 2,
    label: 'Mapa',
    form: 'form-mapa'
  }, {
    idx: 3,
    label: 'Extra',
    form: 'form-extra'
  }, {
    idx: 4,
    label: 'Resumen',
    form: ''
  }
];

const Content = (props) => {
  switch (props.step) {
    case 0:
      return <FormBasic />
    case 1:
      return <FormFormula defaultTitle />
    case 2:
      return <FormMapa defaultTitle />
    case 3:
      return <FormExtra />
    case 4:
      return <Summary />;
    default:
      return <ErrorContent error='Invalid Step' />
  }
}

const initialState = {
  nombre: '',
  adornment: '',
  definicion: '',
  ultimoValorDisponible: 0,
  anioUltimoValorDisponible: new Date().getFullYear(),
  periodicidad: 0,
  temas: [],
  medida: null,
  cobertura: null,
  ods: null,
  formula: {
    ecuacion: '',
    descripcion: '',
    hasEcuacion: true,
    variables: [defaultVariable]
  },
  mapa: defaultMapa,
  observaciones: '',
  fuente: '',
  image: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'update-form-basic':
    case 'update-form-extra':
      return { ...state, ...action.payload };
    case 'update-form-mapa':
      return { ...state, mapa: { ...action.payload } }
    case 'update-form-formula':
      return { ...state, formula: { ...action.payload } }
    case 'clear':
      return initialState;
    default:
      throw new Error('Invalid action type');
  }
}

const createIndicadorFormData = (indicador) => {
  const formData = new FormData();
  for (const field in indicador) {
    if (!indicador[field]) {
      continue;
    }
    if (field === 'tema') {
      formData.append('idTema', indicador[field].id);
      continue;
    }

    if (field === 'dimension') {
      formData.append('idDimension', indicador[field].id);
      continue;
    }

    if (field === 'medida' || field === 'ods' || field === 'cobertura') {
      formData.append('catalogos[]', indicador[field].id);
      continue;
    }
    if (field === 'formula') {
      if (!indicador[field].ecuacion) {
        continue;
      }
      formData.append('formula[ecuacion]', encodeURIComponent(indicador[field].ecuacion));
      formData.append('formula[descripcion]', indicador[field].descripcion);
      formData.append('formula[isFormula]', indicador[field].hasEcuacion ? 'SI' : 'NO');
      for (const variable of indicador[field].variables) {
        const { nombre, dato, anio, medida, variableDesc } = variable;
        formData.append('formula[variables][]',
          JSON.stringify({
            nombre,
            dato: Number(dato),
            anio: Number(anio),
            idUnidad: medida.id,
            descripcion: variableDesc
          }));
      }

      continue;
    }
    if (field === 'mapa') {
      if (indicador[field].url) {
        formData.append('mapa[url]', indicador[field].url);
      }
      if (indicador[field].ubicacion) {
        formData.append('mapa[ubicacion]', indicador[field].ubicacion)
      }
      if (indicador[field]?.urlImagen && indicador[field].urlImagen.length > 0) {
        formData.append('urlImagen', indicador[field].urlImagen[0]);
      }
      continue;
    }
    if (field === 'periodicidad') {
      formData.append('periodicidad', typeof indicador[field] === 'number' ? indicador[field] : null)
    }
    formData.append(field, indicador[field])
  }
  return formData;
}

const formStateInitial = {
  error: null,
  uploading: false,
}

export const FormIndicador = (props) => {
  const alert = useAlert();
  const isMounted = useIsMounted();
  const [indicador, dispatch] = useReducer(reducer, initialState);
  const [currentStep, setCurrentStep] = useState(0)
  const [formState, setFormState] = useState(formStateInitial);
  const handleBack = useCallback(() => {
    setFormState(formStateInitial)
    setCurrentStep(prev => prev === 0 ? 0 : prev - 1)
  }, [setCurrentStep]);

  const handleNext = useCallback(() => {
    setCurrentStep(prev => {
      const lastValue = (STEPS.length - 1)
      return prev === lastValue ? lastValue : prev + 1
    })
  }, [setCurrentStep]);

  const onSubmit = useCallback((data) => {
    const currentForm = STEPS[currentStep].form;
    dispatch({ type: `update-${currentForm}`, payload: { ...data } });
    handleNext();
  }, [currentStep]);

  const handleSubmit = async () => {
    const payload = createIndicadorFormData(indicador);
    setFormState(prev => ({ ...prev, uploading: true }))
    try {
      const created = await createIndicador(payload);
      alert.success(`Indicador '${created.nombre}' creado exitosamente`)
      props.close();
    } catch (error) {
      setFormState(prev => ({ ...prev, error }))
    } finally {
      if (isMounted()) {
        setFormState(prev => ({ ...prev, uploading: false }))
      }
    }
  };

  return (
    <IndicadorProvider
      indicador={indicador}
      dispatch={dispatch}
      onSubmit={onSubmit}
      formState={formState}
      setFormState={setFormState}
    >
      <DialogTitle>
        Nuevo Indicador
      </DialogTitle>
      <HorizontalStepper
        activeStep={currentStep}
        stepLabels={STEPS}
      />
      <DialogContent sx={{ height: '60vh' }}>
        <Content step={currentStep} />
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ mr: 'auto' }}
          onClick={props.close}
        >Cancelar</Button>
        <Button
          onClick={handleBack}
          disabled={currentStep === 0}>Atras</Button>
        {
          (currentStep === STEPS.length - 1)
            ? (
              <Button
                variant='contained'
                onClick={handleSubmit}>
                {formState.error ? 'Intentar de nuevo' : 'Terminar'}
              </Button>)
            : (<Button
              type='submit'
              form={STEPS[currentStep].form}
              variant='contained'>Siguiente</Button>)
        }
      </DialogActions>
    </IndicadorProvider>
  );
};