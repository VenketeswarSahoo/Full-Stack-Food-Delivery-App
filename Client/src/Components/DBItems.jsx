import React from "react";
import DataTable from "./DataTable";
import { HiCurrencyRupee } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../context/actions/productActions";
import { deleteAProduct, getAllProduct } from "../api";

const DBItems = () => {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  return (
    <div className=" flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "imageURL",
            render: rowData =>
              <img
                src={rowData.imageURL}
                className="w-32 h-16 object-contain rounded-md"
                alt=""
              />
          },
          {
            title: "Name",
            field: "product_name"
          },
          {
            title: "Category",
            field: "product_category"
          },
          {
            title: "Price",
            field: "product_price",
            render: rowData =>
              <p className="text-2xl font-semibold text-textColor flex items-center justify-center  ">
                <HiCurrencyRupee className="text-red-400" />
                {parseFloat(rowData.product_price).toFixed(2)}
              </p>
          }
        ]}
        data={products}
        title="List of Products"
        actions={[
          rowData => ({
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (event, rowData) => {
              alert("Really you want to edit this" + rowData.productId);
            }
          }),
          rowData => ({
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (event, rowData) => {
              if (
                window.confirm("Are  you sure, you want to perform this action")
              ) {
                deleteAProduct(rowData.productId).then(res => {
                  // dispatch(alertSuccess("Product Deleted"));
                  getAllProduct().then(data => {
                    dispatch(setAllProducts(data));
                  });
                });
              }
            }
          })
        ]}
      />
    </div>
  );
};

export default DBItems;
