import React from 'react'

interface Param {
	id: number
	name: string
	type: 'string' | 'number'
}

interface ParamValue {
	paramId: number
	value: string
}

interface Color {
	id: number
	name: string
	code: string
}

interface Model {
	paramValues: ParamValue[]
	colors: Color[]
}

interface Props {
	params: Param[]
	model: Model
}

interface State {
	paramValues: ParamValue[]
}

class ParamEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			paramValues: [...props.model.paramValues.map(item => ({ ...item }))],
		}
	}

	handleChangeParams = (paramId: number, value: string) => {
		this.setState(prevState => {
			const index = prevState.paramValues.findIndex(
				param => param.paramId === paramId
			)

			if (index !== -1) {
				const newParamsValues = [...prevState.paramValues]
				newParamsValues[index] = { ...newParamsValues[index], value }
				return { paramValues: newParamsValues }
			}

			return {
				paramValues: [...prevState.paramValues, { paramId, value }],
			}
		})
	}

	public getModel(): Model {
		return {
			paramValues: [...this.state.paramValues],
			colors: [...this.props.model.colors],
		}
	}

	render() {
		const { params } = this.props
		const { paramValues } = this.state

		return (
			<div>
				{params.map(param => {
					const paramValue = paramValues.find(pv => pv.paramId === param.id)
					const value = paramValue ? paramValue.value : ''

					return (
						<div
							key={param.id}
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								gap: '2px',
							}}
						>
							<label>{param.name}</label>
							<ParamInput
								type={param.type}
								value={value}
								onChange={(val: string) =>
									this.handleChangeParams(param.id, val)
								}
							/>
						</div>
					)
				})}
			</div>
		)
	}
}

interface ParamInputProps {
	type: 'string' | 'number'
	value: string
	onChange: (value: string) => void
}

const ParamInput: React.FC<ParamInputProps> = ({ type, value, onChange }) => {
	const inputType = type === 'number' ? 'number' : 'text'

	return (
		<input
			type={inputType}
			value={value}
			onChange={e => onChange(e.target.value)}
			className='param-input'
		/>
	)
}

const params: Param[] = [
	{
		id: 1,
		name: 'Назначение',
		type: 'string',
	},
	{
		id: 2,
		name: 'Длина',
		type: 'string',
	},
]

const model: Model = {
	paramValues: [
		{
			paramId: 1,
			value: 'повседневное',
		},
		{
			paramId: 2,
			value: 'макси',
		},
	],
	colors: [],
}

export const ParamEditorDemo = () => {
	const paramEditorRef = React.useRef<ParamEditor>(null)

	const handleGetModel = () => {
		if (paramEditorRef.current) {
			const model = paramEditorRef.current.getModel()
			console.log('Current model:', model)
		}
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				height: '100vh',
			}}
		>
			<h1>Редактор параметров</h1>
			<div>
				<ParamEditor ref={paramEditorRef} params={params} model={model} />
				<button onClick={handleGetModel}>Получить модель</button>
			</div>
		</div>
	)
}

export default ParamEditor
