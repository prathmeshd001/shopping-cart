import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext"
import items from "../data/items.json";
import { formateCurrency } from "../utilities/formatCurrency";

type CartItemProps ={
    id: number
    quantity: number
}

export function CartItem({ id, quantity}: CartItemProps) {
    const {removeFromCart} = useShoppingCart();
    const item = items.find(item => item.id === id);
    if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
        <img src={item.imgUrl} style = {{width: "125px", height: "75px", objectFit: "cover"}} /> 
        <div className="me-auto">
            <div>
                {item.name}{" "} {<span className="text-muted">x{quantity}</span>}
            </div>
            <div className="text-muted" style={{fontSize: ".75rem"}}>{formateCurrency(item.price)}</div>
        </div>
        <div>{formateCurrency(item.price * quantity)}</div>
        <Button variant="outline-danger" size="sm" onClick={()=> removeFromCart(item.id)}>&times;</Button>
    </Stack>
  )
}
