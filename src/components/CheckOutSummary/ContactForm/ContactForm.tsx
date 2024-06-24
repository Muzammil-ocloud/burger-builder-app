import React, { useState, useEffect } from "react";
import classes from "./ContactForm.module.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { TIngredients } from "../../../containers/BurgerBuilder/BurgerBuilder";
import Swal from "sweetalert2";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
function ContactForm() {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState([
    {
      elementConfig: {
        name: "name",
        type: "text",
        placeholder: "Your Name",
      },
      elementType: "input",
      value: "",
    },
    {
      elementConfig: {
        name: "email",
        type: "email",
        placeholder: "Your Email",
      },
      elementType: "input",
      value: "",
    },
    {
      elementConfig: {
        name: "street",
        type: "text",
        placeholder: "Your street",
      },
      elementType: "input",
      value: "",
    },
    {
      elementConfig: {
        name: "postalCode",
        type: "text",
        placeholder: "Your postalCode",
      },
      elementType: "input",
      value: "",
    },
    {
      elementConfig: {
        name: "DeliveryMethod",
        placeholder: "Delivery Method",
        options: ["Cheapest", "Fastest"],
      },
      elementType: "select",
      value: "Cheapest",
    },
  ]);
  const location = useLocation();
  const onChangeHandler = (e: any, i: number) => {
    // setUserData({ ...userData, [e.target.name]: e.target.value });
    let data = [...inputData];
    data[i].value = e.target.value;
    setInputData(data);
  };
  const [ingredients, setIngredients] = useState<TIngredients | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  useEffect(() => {
    if (location?.state) {
      setIngredients(location.state.ingredients);
      setTotalPrice(location.state.totalPrice);
    }
  }, []);
  const checkValidation = () => {
    if (inputData[0].value.length < 3) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please enter a valid name",
        showConfirmButton: true,
        timer: 1000,
      });
      return;
    }
    if (
      !/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(inputData[1].value)
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please enter a valid email address",
        showConfirmButton: true,
        timer: 1000,
      });
      return;
    }
    if (inputData[2].value.length < 3) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please enter a valid street",
        showConfirmButton: true,
        timer: 1000,
      });
      return;
    }
    if (inputData[3].value.length < 5) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please enter a valid postal code",
        showConfirmButton: true,
        timer: 1000,
      });
      return;
    }
    // if (inputData[2].value.length < 3) {
    // }
    // if (inputData[3].value.length < 3) {
    // }
    sendData();
  };
  const sendData = async () => {
    const data: {
      userInfo: {
        name: string;
        email: string;
        street: string;
        postalCode: string;
        deliveryMethod: string;
      };
      ingredients: any;
      totalPrice: number | null;
    } = {
      userInfo: {
        name: inputData[0].value,
        email: inputData[1].value,
        street: inputData[2].value,
        postalCode: inputData[3].value,
        deliveryMethod: inputData[4].value,
      },
      ingredients,
      totalPrice,
    };

    axios
      .post("/orders.json", data)
      .then((res) => {
        console.log(res);
        Swal.fire("Success!", "Order Placed Successfully", "success");
        navigate("/");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div className={classes.container}>
      <h1>Contact Form</h1>
      <form className={classes.form}>
        {inputData.map((data, i: number) => {
          return (
            <Input
              key={i}
              elementType={data.elementType}
              elementConfig={data.elementConfig}
              value={data.value}
              onChange={(e: any) => {
                onChangeHandler(e, i);
              }}
            />
          );
        })}
        <Button
          clicked={(event: any) => {
            event.preventDefault();
            checkValidation();
          }}
          btnType="Success"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ContactForm;
