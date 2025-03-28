interface IButtonProps {
    onClick: () => void
}



export const Button = ({onClick}: IButtonProps) => {
    return (
        <>
            <button className="text-white cursor-pointer bg-blue-600" onClick={onClick}></button>
        </>
    )
}