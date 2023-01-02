import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function Enter() {
  const navigate = useNavigate();
  const [companies, SetCompanies] = useState([]);
  function onClick(e, company_id) {
    console.log(company_id);
    console.log(companies.filter((p) => p.company._id == company_id));

    localStorage.setItem(
      "company",
      JSON.stringify(
        companies.filter((p) => p.company._id == company_id)[0].company
      )
    );
    navigate(`/Traffic`);
  }
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${access_token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_API_BASE_URL}/companyUser/`, requestOptions)
      .then((response) => response.text())
      .then((result) => SetCompanies(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  });

  return (
    <div className="enter__background">
      <div className="enter--container">
        <a className="enter__text" href="">
          انتخاب شرکت
        </a>
        <button className="enter__btn">
          <p className="enter__btn--text">تغییر شماره</p>
          <img
            className="enter__icon-out"
            src="../images/icon/out.svg"
            alt=""
          />
        </button>
      </div>
      {companies.map((companyUser) => (
        <div className="enter__position">
          <div
            key={"div" + companyUser.company._id}
            className="enter__medrik--container"
          >
            <img
              key={"img_" + companyUser.company._id}
              className="enter__building--icon"
              src="../images/icon/building-solid.svg"
              alt=""
            />
            <a
              key={companyUser.company._id}
              className="enter__medrik--text"
              onClick={(e) => onClick(e, companyUser.company._id)}
            >
              {companyUser.company.name}
            </a>
            <img
              key={"img_2" + companyUser.company._id}
              className="enter__arrow--icon"
              src="../images/icon/arrow-left-solid.svg"
              alt=""
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Enter;
