import Swal from "sweetalert2"

export const showAlert = (options) => {
  return Swal.fire({
    customClass: {
      container: 'my-swal'
    },
    confirmButtonColor: options.customConfirmButtonColor || 'var(--blue-500)',
    cancelButtonColor: 'white',
    confirmButtonText: options.customConfirmButtonText || 'Aceptar',
    cancelButtonText: `<span style="color: black">${options.customCancelButtonText || 'Cancelar'}</span>`,
    html: options.text || options.html,
    ...options,
  })
}