import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOrders } from "../../hooks/useOrders";
import { RenderUpdateOrderForm } from "../../components/orders/RenderUpdateOrderForm";

export const UpdateOrder = () => {
    const { id } = useParams();

    const { getOrderByIdHandler, order } = useOrders();
  
    useEffect(() => {
      id && getOrderByIdHandler(id);
    }, []);
    return (
        <>
            {id && order && <RenderUpdateOrderForm id={id} order={order} ></RenderUpdateOrderForm>}
        </>
    )
}