import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContextProps = {
    openCart: ()=> void
    closeCart: ()=> void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

type CartItem = {
    id: number
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);


export function useShoppingCart(){
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps){
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const cartQuantity= cartItems.reduce((quantity, item) =>{
        return item.quantity+ quantity;
    }, 0);

    function openCart(){
        setIsOpen(true);
    }

    function closeCart(){
        setIsOpen(false);
    }

    function getItemQuantity(id: number): number {
        return cartItems.find(item => item.id === id)?.quantity || 0; 
    }

    function increaseCartQuantity(id: number): void {
        setCartItems(curItems=>{
            if(curItems.find(item => item.id === id) == null){
                return [...curItems, {id: id, quantity: 1}];
                
            } else{
                return curItems.map( item=>{
                    if(item.id === id){
                        return {...item, quantity: item.quantity+1};
                    }
                    else return item;
                });
            }
        });
        
    }

    function decreaseCartQuantity(id: number): void {
        setCartItems(curItems=>{
            if(curItems.find(item => item.id === id)?.quantity === 1){
                return curItems.filter( item=>{
                    return item.id !== id;
                });
            } else{
                return curItems.map( item=>{
                    if(item.id === id){
                        return {...item, quantity: item.quantity-1};
                    }

                    return item;
                });
            }
        });
    }

    function removeFromCart(id: number): void{
        setCartItems(curItems=>{
            return curItems.filter(item=> item.id !== id);
        });
    }

    return <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart}}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
}