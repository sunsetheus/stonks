export const TYPE_FILTER_OPTIONS = [
    {
        display: 'All',
        value: 'all'
    },
    {
        display: 'Income',
        value: 'income'
    },
    {
        display: 'Expense',
        value: 'expense'
    },
]
export const INCOME_CATEGORY_FILTER_OPTIONS = [
    {
        display: 'Allowance',
        value: 'allowance'
    },
    {
        display: 'Bonus',
        value: 'bonus'
    },
    {
        display: 'Salary',
        value: 'salary'
    },
    {
        display: 'Other',
        value: 'other'
    },
]
export const EXPENSE_CATEGORY_FILTER_OPTIONS = [
    {
        display: 'Education',
        value: 'education'
    },
    {
        display: 'Fashion',
        value: 'fashion'
    },
    {
        display: 'Food',
        value: 'food'
    },
    {
        display: 'Household',
        value: 'household'
    },
    {
        display: 'Transport',
        value: 'transport'
    },
    {
        display: 'Other',
        value: 'others'
    },
]
export const MONTH_FILTER_OPTIONS = [
    {
        display: 'All',
        value: 'all'
    },
    {
        display: 'January',
        value: 'jan'
    },
    {
        display: 'February',
        value: 'feb'
    },
    {
        display: 'March',
        value: 'mar'
    },
    {
        display: 'April',
        value: 'apr'
    },
    {
        display: 'May',
        value: 'may'
    },
    {
        display: 'June',
        value: 'jun'
    },
    {
        display: 'July',
        value: 'jul'
    },
    {
        display: 'August',
        value: 'aug'
    },
    {
        display: 'September',
        value: 'sep'
    },
    {
        display: 'October',
        value: 'oct'
    },
    {
        display: 'November',
        value: 'nov'
    },
    {
        display: 'December',
        value: 'dec'
    },
]
export const YEAR_FILTER_OPTIONS = [
    {
        display: 'All',
        value: 'all'
    },
    {
        display: '2024',
        value: '2024'
    },
    {
        display: '2025',
        value: '2025'
    },
]

export const CALENDAR_SIDEBAR_DEFAULT_VALUE = {
    date: new Date(),
    transactions: [
        {
            id: 1,
            name: "Eternal sunshine album",
            type: "expense",
            category: "other",
            date: new Date(),
            money: 1
        },
    ]
}

// CHART CONST
export const GROUPED_TRANSACTION_DEFAULT_VALUE: { month: string; income: number; expense: number }[] = [
    {
        month: 'Jan',
        income: 0,
        expense: 0
    },
    {
        month: 'Feb',
        income: 0,
        expense: 0
    },
    {
        month: 'Mar',
        income: 0,
        expense: 0
    },
    {
        month: 'Apr',
        income: 0,
        expense: 0
    },
    {
        month: 'May',
        income: 0,
        expense: 0
    },
    {
        month: 'Jun',
        income: 0,
        expense: 0
    },
    {
        month: 'Jul',
        income: 0,
        expense: 0
    },
    {
        month: 'Aug',
        income: 0,
        expense: 0
    },
    {
        month: 'Sep',
        income: 0,
        expense: 0
    },
    {
        month: 'Oct',
        income: 0,
        expense: 0
    },
    {
        month: 'Nov',
        income: 0,
        expense: 0
    },
    {
        month: 'Dec',
        income: 0,
        expense: 0
    },
];

export const GROUPED_NET_INCOME_DEFAULT_VALUE: { month: string; netIncome: number }[] = [
    {
        month: 'Jan',
        netIncome: 0
    },
    {
        month: 'Feb',
        netIncome: 0
    },
    {
        month: 'Mar',
        netIncome: 0
    },
    {
        month: 'Apr',
        netIncome: 0
    },
    {
        month: 'May',
        netIncome: 0
    },
    {
        month: 'Jun',
        netIncome: 0
    },
    {
        month: 'Jul',
        netIncome: 0
    },
    {
        month: 'Aug',
        netIncome: 0
    },
    {
        month: 'Sep',
        netIncome: 0
    },
    {
        month: 'Oct',
        netIncome: 0
    },
    {
        month: 'Nov',
        netIncome: 0
    },
    {
        month: 'Dec',
        netIncome: 0
    },
];

export const GROUPED_INCOME_CATEGORY_DEFAULT_VALUE: { category: string; money: number }[] = [
    {
        category: 'allowance',
        money: 0
    },
    {
        category: 'bonus',
        money: 0
    },
    {
        category: 'salary',
        money: 0
    },
    {
        category: 'other',
        money: 0
    },
];

export const GROUPED_EXPENSE_CATEGORY_DEFAULT_VALUE: { category: string; money: number }[] = [
    {
        category: 'education',
        money: 0
    },
    {
        category: 'fashion',
        money: 0
    },
    {
        category: 'food',
        money: 0
    },
    {
        category: 'household',
        money: 0
    },
    {
        category: 'transport',
        money: 0
    },
    {
        category: 'other',
        money: 0
    },
];