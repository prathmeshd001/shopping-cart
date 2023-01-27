import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formateCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import items from "../data/items.json";

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({isOpen}: ShoppingCartProps) {
    const {closeCart, cartItems}  = useShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement= "end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item =>{
                        return <CartItem {...item} key={item.id}/>
                    })}
                    <div className="ms-auto fw-bold fs-5">
                        Total {formateCurrency(cartItems.reduce((acc, cartItem) =>{
                            const item = items.find(item => item.id === cartItem.id);
                            if(item ==null) return acc;

                            acc = acc + (cartItem.quantity *item.price);
                            return acc;
                        }, 0))}
                    </div>
                </Stack>
            </Offcanvas.Body>
    </Offcanvas>
  )
}
