import Button from '@mui/material/Button'
import { Modal } from '@/components/Core/modals/Modal'

const non = () => {}
export function ConfirmModal({
  children,
  open = false,
  title,
  text,
  confirmLabel,
  cancelLabel,
  fullWidth = true,
  size = 'sm',
  onConfirm = non,
  onClose = non,
}) {
  return (
    <Modal
      title={title}
      text={text}
      open={open}
      onClose={onClose}
      maxWidth={size}
      fullWidth={fullWidth}
      actions={
        <>
          <Button onClick={onConfirm}>{confirmLabel ?? 'CONFIRMAR'}</Button>
          <Button onClick={onClose}>{cancelLabel ?? 'CERRAR'}</Button>
        </>
      }
    >
      {children}
    </Modal>
  )
}
