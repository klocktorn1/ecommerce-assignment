import { useParams } from "react-router-dom"
import { RenderProduct } from "../../components/products/RenderProduct"

export const Product = () => {

    const {id} = useParams()
    
    return(
        <>
            {id && <RenderProduct id={id}></RenderProduct>}

        </>
    )
}