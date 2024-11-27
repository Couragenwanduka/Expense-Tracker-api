interface subscription {
    isSubscribe ?: boolean
    paymentDate ?: Date
    paymentData?: string
}
export interface Iuser {
    firstName: string
    lastName: string
    email: string
    password: string
    country: string
    currency: string
    flag:string
    age?: number
    gender: string
    dateofbirth?: Date
    yearlyIncome?: number
    subscribed?: subscription
}