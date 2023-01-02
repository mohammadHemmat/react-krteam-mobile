import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function Validation() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber");
  const [code, SetCode] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      phoneNumber: phoneNumber,
      otp: code,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/verify`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let result_json = JSON.parse(result);
        localStorage.setItem("access_token", result_json.access_token);
        navigate(`/Enter`);
      })
      .catch((error) => console.log("error", error));
  }
  function onChange(e) {
    SetCode(e.target.value);
  }
  return (
    <div className="login__background">
      <header className="header-container">
        <h3 className="header__text">ورود به حساب کاربری</h3>
        <img className="heade-bg3" src="../images/bg3.png" alt="..." />
      </header>
      <div className="btn-container">
        <form className="btn-container" onSubmit={handleSubmit}>
          <input
            id="code"
            name="code"
            className="input-text"
            type="text"
            value={code}
            onChange={onChange}
            placeholder="کد ارسال شده را وارد کنید"
          />
          <button className="btn__size btn-inter" type="submit">
            <a className="login__text--btn" href="">
              ورود
            </a>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Validation;
