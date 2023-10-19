import React, { useEffect } from "react";
import Header from "../Components/Header";
import Home from "../Components/Home";
import HomeSlider from "../Components/HomeSlider";
import FilterSection from "../Components/FilterSection";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import Cart from "../Components/Cart";

const Main = () => {
  const products = useSelector(state => state.products);
  const isCart = useSelector(state => state.isCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProduct().then(data => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <Home />
        <HomeSlider />
        <FilterSection />
      </div>

      {isCart && <Cart />}
    </main>
  );
};

export default Main;
