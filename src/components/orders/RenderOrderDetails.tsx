import { useEffect, useState } from "react";
import { useOrders } from "../../hooks/useOrders";
import { IUpdateOrderItemQuantity } from "../../models/IOrder";
import { Minus, Plus } from "lucide-react";

interface IRenderOrderDetailsProps {
  id: string;
}

export const RenderOrderDetails = ({ id }: IRenderOrderDetailsProps) => {
  const {
    order,
    getOrderByIdHandler,
    updateOrderItemQuantityHandler,
    deleteOrderItemHandler,
  } = useOrders();

  const [updateCount, setUpdateCount] = useState<number>(0);

  useEffect(() => {
    getOrderByIdHandler(id);
  }, [updateCount]);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    const updatedQuantity: IUpdateOrderItemQuantity = {
      quantity: newQuantity,
    };
    updateOrderItemQuantityHandler(itemId, id, updatedQuantity);
    setUpdateCount(updateCount + 1);
  };

  if (!order) return <p>Loading...</p>;

  return (
    <table className="border-collapse border border-gray-400 w-full text-white">
      <tbody>
        <tr>
          <td className="border border-gray-300 p-2">Order ID</td>
          <td className="border border-gray-300 p-2">{order.id}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Customer ID</td>
          <td className="border border-gray-300 p-2">{order.customer_id}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Total Price</td>
          <td className="border border-gray-300 p-2">${order.total_price}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Payment Status</td>
          <td className="border border-gray-300 p-2">{order.payment_status}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Payment ID</td>
          <td className="border border-gray-300 p-2">{order.payment_id}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Order Status</td>
          <td className="border border-gray-300 p-2">{order.order_status}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Created At</td>
          <td className="border border-gray-300 p-2">
            {new Date(order.created_at).toLocaleString()}
          </td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Customer Name</td>
          <td className="border border-gray-300 p-2">
            {order.customer_firstname} {order.customer_lastname}
          </td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Customer Email</td>
          <td className="border border-gray-300 p-2">{order.customer_email}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Customer Phone</td>
          <td className="border border-gray-300 p-2">{order.customer_phone}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Customer Address</td>
          <td className="border border-gray-300 p-2">
            {order.customer_street_address}, {order.customer_postal_code},{" "}
            {order.customer_city}, {order.customer_country}
          </td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Ordered Items</td>
          <td className="border border-gray-300 p-2">
            <ul>
              {order.order_items.map((item, index) => (
                <li key={index}>
                  {item.id} {item.product_name} - {item.quantity} x $
                  {item.unit_price}
                  <div className="flex gap-4">
                    <button
                    className="text-white hover:cursor-pointer hover:scale-120 bg-blue-600 duration-200 ease-in-out"
                      onClick={() => {
                        setUpdateCount(updateCount + 1);
                        deleteOrderItemHandler(item.id, id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="text-white hover:cursor-pointer hover:scale-120 duration-200 ease-in-out"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      <Plus></Plus>
                    </button>
                    <button
                      className="text-white hover:cursor-pointer hover:scale-120 duration-200 ease-in-out"
                      disabled={item.quantity === 1}
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      <Minus></Minus>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
