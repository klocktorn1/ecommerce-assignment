import { useEffect } from "react";
import { useCustomers } from "../../hooks/useCustomers";
import { Link } from "react-router-dom";

export const RenderCustomers = () => {
  const { customers, getCustomersHandler, deleteCustomerHandler } =
    useCustomers();

  useEffect(() => {
    getCustomersHandler();
  }, []);

  return (
    <>
      <table className="border-2">
        <thead>
          <tr>
            <th>ID:</th>
            <th>Name:</th>
            <th>Full adress:</th>
            <th>Email:</th>
            <th>Phone:</th>
            <th>Created at:</th>
            <th>Options:</th>
          </tr>
        </thead>
        {customers.map((c, i) => (
          <tbody key={i}>
            <tr>
              <td>{c.id}</td>
              <td>
                {c.firstname} {c.lastname}
              </td>
              <td>
                {c.street_address}, {c.postal_code}, {c.city}, {c.country}
              </td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.created_at}</td>
              <td className="m-0.5">
                <button
                  onClick={() => {
                    deleteCustomerHandler(c.id);
                  }}
                >
                  Delete
                </button>
                <Link to={`/admin/update-customer/${c.id}`}>
                  <button>Update</button>
                </Link>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
};

// <td>
// {c.firstname} {c.lastname}
// </td>
// <td>
// {c.street_address}, {c.postal_code}, {c.city}, {c.country}
// </td>
// <td>{c.email}</td>
// <td>{c.phone}</td>
// <td>{c.created_at}</td>
