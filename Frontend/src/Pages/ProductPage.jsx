import React, { useEffect } from "react";
import style from "../CSS/products.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ImPlus, ImMinus } from "react-icons/im";
import { getProducts, AddtoCart, ChangeQuanity } from "../Redux/product/product.action";

function ProductPage({ title }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((store) => store.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  function handleQuantity(id, val) {
    dispatch(ChangeQuanity(data,id,val))
  }

  function addtocart(id) {
   dispatch(AddtoCart(data,id))
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className={style.heading}style={{textAlign:"center",fontSize:"50px",fontWeight:"bolder"}}>{title}</h2>
      <div className={style.products}>
        {data?.map((e, i) => (
          <div className={style.product} key={i}>
            <div className={style.prodimg}>
              <img src={e.image} alt="" />
            </div>
            <div className={style.prodinfo}>
              <h4 className={style.title}>{e?.title.slice(1, 15)}</h4>
              <p className={style.desc}>
                {e?.description.slice(0, 45).toLowerCase()}
              </p>
              <p className={style.price}> Rs. {e?.price}</p>
              {!e?.added ? (
                <div onClick={()=>addtocart(e?.id)} className={style.addtocart}>Add To Cart</div>
              ) : (
                <div className={style.quantity}>
                  <button
                    onClick={() => handleQuantity(e?.id, e?.quantity + 1)}
                  >
                    <ImPlus />
                  </button>
                  <span> {e?.quantity} </span>
                  <button
                    disabled={e?.quantity == 1}
                    onClick={() => handleQuantity(e?.id, e?.quantity - 1)}
                  >
                    <ImMinus />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
