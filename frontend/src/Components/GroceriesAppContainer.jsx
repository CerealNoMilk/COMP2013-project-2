import { useEffect, useState } from "react";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import ProductForm from "./ProductForm";
import axios from "axios";




export default function GroceriesAppContainer() {
  const [productQuantity, setProductQuantity] = useState([]);

  //States
  const [products, setProducts] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    brand: "",
    quantity: "",
    image: "",
    price: "",
  });


  //Handlers **had to move this here due to useEffect below needing it**

  const handleProductsDB = async () => {
    try{
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
      setProductQuantity(response.data.map((product) => ({ id: product.id, quantity: 0 })));
    }catch(error){
      console.log(error.message);
    }
  };

  //useEffects
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect**had to use the ignore this line becuase it was giving me an error even though it works fine**
    handleProductsDB();
  }, []);



//Hnadlers pt.2

//handle to delete on product by id
const handleOnDelete = async (id) => {
try{
 await axios.delete(`http://localhost:3000/products/${id}`);
await handleProductsDB();

}catch(error){
  console.log(error.message);
}
};
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnEdit = (product) => {
    setFormData({
      id: product.id,
      productName: product.productName,
      brand: product.brand,
      quantity: product.quantity,
      image: product.image,
      price: product.price,
    });
    setEditProductId(product.id);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if(editProductId){
        await axios.put(`http://localhost:3000/products/${editProductId}`, formData);
      } else {
      await axios.post("http://localhost:3000/products", formData);
      }
      await handleProductsDB();
    
     setFormData({
        id: "",
        productName: "",
        brand: "",
        quantity: "",
        image: "",
        price: "",
      });
      setEditProductId(null);
    
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleAddToCart = (productId) => {
    const product = products.find((product) => product.id === productId);
    const pQuantity = productQuantity.find(
      (product) => product.id === productId
    );
    const newCartList = [...cartList];
    const productInCart = newCartList.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };

  const handleClearCart = () => {
    setCartList([]);
  };

  return (
    <div>
      <ProductForm id={formData.id}
       productName={formData.productName}
        brand={formData.brand} 
        quantity={formData.quantity}
         image={formData.image}
          price={formData.price}
           handleOnChange={handleOnChange}
           handleOnSubmit={handleOnSubmit}
           isEdit={Boolean(editProductId)}
           />
      <NavBar quantity={cartList.length} />
      <div className="GroceriesApp-Container">

        <ProductsContainer
          products={products}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          handleOnDelete={handleOnDelete}
          handleOnEdit={handleOnEdit}
          productQuantity={productQuantity}
        />
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
};