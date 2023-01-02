import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

function Login() {
  const [phoneNumber, SetPhoneNumber] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      phoneNumber: phoneNumber,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/signIn`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        navigate(`/validation?phoneNumber=${phoneNumber}`);
      })
      .catch((error) => console.log("error", error));
  }
  function onChange(e) {
    SetPhoneNumber(e.target.value);
  }
  return (
    <div className="login__background">
      <header className="header-container">
        <h3 className="header__text">ورود به حساب کاربری</h3>
        <img className="heade-bg3" src="../images/bg3.png" alt="..." />
      </header>
      <form className="btn-container" onSubmit={handleSubmit}>
        <input
          id="phone"
          name="phone"
          className="input-text"
          type="text"
          value={phoneNumber}
          onChange={onChange}
          placeholder="شماره موبایل خود را وارد کنید"
        />
        <button className="btn__size btn-inter" type="submit">
          ورود
        </button>
      </form>
    </div>
  );
}

export default Login;
