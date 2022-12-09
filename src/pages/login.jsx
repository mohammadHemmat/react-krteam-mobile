import React, { useState } from "react";

function Login() {
  const [phoneNumber, SetPhoneNumber] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    console.log(phoneNumber);
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
  function onChange(e) {
    SetPhoneNumber(e.target.value);
  }
  return (
    <div>
      <header className="header-container">
        <h3 className="header__text">ورود به حساب کاربری</h3>
        <img className="heade-bg3" src="images/bg3.png" alt="..." />
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
