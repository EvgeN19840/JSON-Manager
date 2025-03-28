import { ToastOptions, toast } from 'react-toastify'
import { TProps } from './interface'

export const newToast = ({ text, type, infin }: TProps) => {
  const setting: ToastOptions = {
    theme: 'light',
    draggable: true,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    hideProgressBar: false,
    autoClose: infin ? false : 5000
  }

  switch (type) {
    case 'success':
      toast.success(text, setting)
      break
    case 'error':
      toast.error(text, setting)
      break
    case 'info':
      toast.info(text, setting)
      break
    case 'warning':
      toast.warning(text, setting)
      break
  }
}
