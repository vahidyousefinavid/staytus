interface cardProps {
    onClick: any
    name: string
    bg: boolean
}

const Button = (props: cardProps) => {
    return (
        <button className={`pr-2 pl-2 pt-1 pb-1 ${props.bg ? 'bg-[#fff]' : 'bg-none'} ${props.bg ? 'text-[#111]' : 'text-[#fff]'} rounded-lg`} onClick={props.onClick}>
            {props.name}
        </button>
    )
}

export default Button