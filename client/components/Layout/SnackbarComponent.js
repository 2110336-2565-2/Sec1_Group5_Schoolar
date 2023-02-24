import { Alert, Snackbar } from '@mui/material'
import { useSnackbar } from '@/context/SnackbarContext'
import { memo } from 'react'

function SnackbarComponent() {
	const { snackbar, closeSnackbar } = useSnackbar()

	return (
		<Snackbar open={snackbar.open} autoHideDuration={snackbar.duration} onClose={closeSnackbar}>
			<Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%', fontWeight: 'bold' }}>
				{snackbar.text}
			</Alert>
		</Snackbar>
	)
}

export default memo(SnackbarComponent)
