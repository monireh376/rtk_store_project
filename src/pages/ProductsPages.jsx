import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


import Card from "../components/Card";
import Loader from "../components/Loader";
import {  fetchProducts } from "../features/product/productSlice";
// import { useProducts } from "../context/ProductContext";
import styles from "./ProductsPages.module.css";
import { filterProducts, getInitialQuery, searchProducts } from "../helper/helper";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";

function ProductsPages() {
  const dispatch = useDispatch();
  const {products, loading} = useSelector(store => store.product);
  
  // const products = useProducts();
  // const products = [];
  
  const [displayed, setDisplayed] = useState([]);
  const [search , setSearch] = useState("");
  const [query, setQuery] = useState({});
useEffect(() => {
    dispatch(fetchProducts());
  },[]);
  const [searchParams, setSearchParams] = useSearchParams();

  

  useEffect(() => {
    setDisplayed(products);


    setQuery(getInitialQuery(searchParams));
  },[products]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);

    setDisplayed(finalProducts);
  },[query])

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      
      <div className={styles.container}>
        <div className={styles.products}>
          {loading && <Loader />}
          {displayed.map(product => (
            <Card key={product.id} data={product} />
          ))}
        </div>
        <Sidebar query={query} setQuery={setQuery}/>
      </div>
    </>
  )
}

export default ProductsPages