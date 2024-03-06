import { ButtonProps } from "@/types/interfaces"

export const Button: React.FC<ButtonProps> = ({
    children, onClick, type
}) => {
    return (
        <button className="flex" onClick={() => onClick()}>
            <text className="text-[16px]">{children}</text>
        </button>
    )
}