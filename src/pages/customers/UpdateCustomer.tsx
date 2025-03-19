import { useEffect } from "react";
import { RenderUpdateCustomerForm } from "../../components/customers/RenderUpdateCustomerForm"
import { useCustomers } from "../../hooks/useCustomers";
import { useParams } from "react-router-dom";

export const UpdateCustomer = () => {
    const { id } = useParams();

    const { getCustomerByIdHandler, customer } = useCustomers();
  
    useEffect(() => {
      id && getCustomerByIdHandler(id);
    }, []);
    return (
        <>
            {id && customer && <RenderUpdateCustomerForm id={id} customer={customer} ></RenderUpdateCustomerForm>}
        </>
    )
}


