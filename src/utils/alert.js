import Swal from "sweetalert2"

export const showAlert = (options) => {
  let confirmText = ''
  const { icon = 'success' } = options;
  return Swal.fire({
    ...options,
    customClass: {
      container: 'my-swal'
    },
    confirmButtonColor: 'var(--blue-500)',
    cancelButtonColor: 'whitesmoke',
    confirmButtonText: `<div style="font-weight: 600; font-family: sans-serif">${options?.icon === 'question' ? 'Aceptar' : 'OK'}</div>`,
    cancelButtonText: `<div style="color: #7A7A7A; font-weight: 600; font-family: sans-serif">${options.customCancelButtonText || 'Cancelar operacion'}</div>`,
  })
}