import { useSearchParams } from "react-router-dom"

export const OrderConfirmation = () => {

    const [searchParams] = useSearchParams()
    console.log(searchParams.get("session_id"));
    
    return (
        <>Order Confirmed!</>
    )
}