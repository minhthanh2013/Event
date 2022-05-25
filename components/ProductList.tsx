import React from "react";
import styles from "../styles/ProductList.module.scss";
import Ticket from "./Ticket";
interface ProductListProps {}
const products = [
  {
    title: "ve cha 1",
    id: 1,
    listChild: [
      { title: "ve con 1", id: 2, listChild: [] },
      { title: "ve con 2", id: 3, listChild: [] },
    ],
  },
  { title: "ve con 3", id: 4, listChild: [] },
  { title: "ve con 4", id: 5, listChild: [] },
  { title: "ve con 1", id: 2, listChild: [] },
  { title: "ve con 2", id: 3, listChild: [] },
];

const types = [1, 2, 2, 2, 2, 1]



const ProductList = (props: ProductListProps) => {
  return (
    <>
      <div className={styles.productWrap}>
        <div className={styles.productContainer}>
          <Ticket/>
          <Ticket/>
          <Ticket/>
        </div>
      </div>
    </>
  )
};

export default ProductList;
