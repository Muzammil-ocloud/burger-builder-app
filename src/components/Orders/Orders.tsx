import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./Orders.module.css";
function Orders() {
  const [orders, setOrders] = useState<any>(null);
  useEffect(() => {
    axios.get("/orders.json").then((res) => {
      let arr = [];
      for (let prop in res.data) {
        arr.push(res.data[prop]);
      }
      setOrders(arr);
    });
  }, []);

  return (
    <div>
      {orders && (
        <div className={classes.container}>
          {orders.map((order: any, index: number) => {
            return (
              <div className={classes.card} key={index}>
                <div>
                  <span className={classes.span}>
                    Bacon {"(" + order.ingredients.bacon + ")  "}
                  </span>

                  <span className={classes.span}>
                    Cheese{"(" + order.ingredients.cheese + ")  "}
                  </span>

                  <span className={classes.span}>
                    Salad{"(" + order.ingredients.salad + ")  "}
                  </span>
                  <span className={classes.span}>
                    Meat{"(" + order.ingredients.meat + ")  "}
                  </span>
                </div>
                <div className={classes.priceText}>
                  {"Total Price: " + order.totalPrice}
                </div>
                <div className={classes.deliveryText}>
                  {"Delivery Method: " + order.userInfo.deliveryMethod}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;
