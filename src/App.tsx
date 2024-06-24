import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckOutSummary from "./components/CheckOutSummary/CheckOutSummary";
import ContactForm from "./components/CheckOutSummary/ContactForm/ContactForm";
import Orders from "./components/Orders/Orders";
function App() {
  return (
    <div className={styles.App}>
      <Layout>
        <Routes>
          <Route path="/" element={<BurgerBuilder />} />
          <Route path="/checkout" element={<CheckOutSummary />}>
            <Route path="/checkout/contact-data" element={<ContactForm />} />
          </Route>
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
