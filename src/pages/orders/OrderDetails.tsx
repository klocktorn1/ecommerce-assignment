import { useParams } from "react-router-dom";
import { RenderOrderDetails } from "../../components/orders/RenderOrderDetails";

export const OrderDetails = () => {
  const { id } = useParams();

  return <>{id && <RenderOrderDetails id={id}></RenderOrderDetails>}</>;
};
