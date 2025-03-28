import { Link } from "react-router-dom";
import { useOrders } from "../../hooks/useOrders";
import { IUpdateOrder } from "../../models/IOrder";

export const RenderOrders = () => {
  const { orders, isLoading, error, removeOrderHandler, updateOrderHandler } =
    useOrders();

  const updateOrders = (
    order_id: number,
    customer_id: number,
    total_price: number,
    payment_status: string,
    order_status: string
  ) => {
    const updatedOrder: IUpdateOrder = {
      customer_id: customer_id,
      total_price: total_price,
      payment_status: payment_status,
      order_status: order_status,
    };
    updateOrderHandler(order_id, updatedOrder);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="bg-black">
        
        <table className="border-collapse border-gray-400 w-full text-white">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Order ID</th>
              <th className="border border-gray-300 p-2">Customer</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Phone</th>
              <th className="border border-gray-300 p-2">Address</th>
              <th className="border border-gray-300 p-2">Total Price</th>
              <th className="border border-gray-300 p-2">Payment Status</th>
              <th className="border border-gray-300 p-2">Order Status</th>
              <th className="border border-gray-300 p-2">Created At</th>
              <th className="border border-gray-300 p-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={i}>
                <td className="border border-gray-300 p-2">{o.id}</td>
                <td className="border border-gray-300 p-2">
                  {o.customer_firstname} {o.customer_lastname}
                </td>
                <td className="border border-gray-300 p-2">{o.customer_email}</td>
                <td className="border border-gray-300 p-2">{o.customer_phone}</td>
                <td className="border border-gray-300 p-2">
                  {o.customer_street_address}, {o.customer_postal_code},{" "}
                  {o.customer_city}, {o.customer_country}
                </td>
                <td className="border border-gray-300 p-2">${o.total_price}</td>
                <td className="border border-gray-300 p-2">{o.payment_status}</td>
                <td className="border border-gray-300 p-2">
                  <select
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      updateOrders(
                        o.id,
                        o.customer_id,
                        o.total_price,
                        o.payment_status,
                        newStatus
                      );
                    }}
                    name=""
                    id=""
                  >
                    <option>Order status: {o.order_status}</option>
                    <option value="pending">pending</option>
                    <option value="sent">sent</option>
                    <option value="delivered">delivered</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(o.created_at).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="text-white hover:cursor-pointer bg-blue-600 hover:scale-120 duration-200 ease-in-out"
                    onClick={() => {
                      removeOrderHandler(o.id);
                    }}
                  >
                    Delete
                  </button>
                  <Link to={`/admin/order-details/${o.id}`}>
                    <button className="text-white hover:cursor-pointer bg-blue-600 hover:scale-120 duration-200 ease-in-out">
                      Order details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
