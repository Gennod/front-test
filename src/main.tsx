import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ParamEditorDemo } from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ParamEditorDemo />
	</StrictMode>
)
