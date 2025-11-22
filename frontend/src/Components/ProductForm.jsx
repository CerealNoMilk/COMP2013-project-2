export default function ProductForm({
    id,
    productName,
    brand,
    quantity,
    image,
    price,
    handleOnSubmit,
    handleOnChange,
}) {
    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="id">Product ID</label>
                <input type="text" name="id" id="id" value={id} onChange={handleOnChange} placeholder="Enter ID"/>
                <br />
                <label htmlFor="productName">Product Name:</label>
                <input type="text" name="productName" id="productName" value={productName} onChange={handleOnChange} placeholder="Enter Product Name"/>
                <br />
                <label htmlFor="brand">Brand:</label>
                <input type="text" name="brand" id="brand" value={brand} onChange={handleOnChange} placeholder="Enter Brand"/>
                <br />
                <label htmlFor="quantity">Quantity:</label>
                <input type="text" name="quantity" id="quantity" value={quantity} onChange={handleOnChange} placeholder="Enter Quantity"/>
                <br />
                <label htmlFor="image">Image URL:</label>
                <input type="text" name="image" id="image" value={image} onChange={handleOnChange} placeholder="Enter Image URL"/>
                <br />
                <label htmlFor="price">Price:</label>
                <input type="text" name="price" id="price" value={price} onChange={handleOnChange} placeholder="Enter Price"/>
                <br />
                <button>Submit Product</button>


            </form>
        </div>
    );
}