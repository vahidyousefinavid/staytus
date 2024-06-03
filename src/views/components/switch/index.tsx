import './index.css';

interface Props {
    checked: boolean
    setChecked: any
}
const Switch = (props: Props) => {
    return (
        <label className="switch">
            <input type="checkbox" checked={props.checked} onChange={(e) => 
                props.setChecked(e.target.checked)                
                } />
            <span className="slider round"></span>
        </label>
    )
}

export default Switch