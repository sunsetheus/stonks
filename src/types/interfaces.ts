export interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void
    type: "primary" | "secondary"
}

export interface OptionProps {
    display: string
    value: string
    icon: React.ReactNode
}

export interface DropdownProps {
    type: string
    options: OptionProps[]
    dropdownValue: string
    setDropdownValue: React.Dispatch<React.SetStateAction<string>>
}

// 
export interface UserProps {
    username: String
    transactions: TransactionProps[]
    balance: number
}

export interface TransactionProps {
    name: string
    type: "income" | "expense"
    category: string
    date: Date
}