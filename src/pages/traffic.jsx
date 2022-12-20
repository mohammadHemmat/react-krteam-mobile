import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import mapboxgl from 'mapbox-gl';

function Traffic() {
  mapboxgl.accessToken = 'pk.eyJ1IjoidGVtcGVyb3J5IiwiYSI6ImNsYnV2bWtiMzFvcHgzb212c3F0YWJ4ZGoifQ.kVv9N0OjBaZClGM6p1jeVw';
  const mapContainer = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  const map = useRef(null);
  const [lng, setLng] = useState(60);
  const [lat, setLat] = useState(35);
  const [userMarker, setuserMarker] = useState();
  const [zoom, setZoom] = useState(13);
  const [x, setx] = useState('');
  const navigate = useNavigate();
  const [company, SetCompany] = useState('');
  function onClick(e, company_id) {
    console.log(company_id);
    localStorage.setItem("company", company_id);
    navigate(`/Traffic`);
  }
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const companyobj = JSON.parse(localStorage.getItem("company"));
    SetCompany(companyobj);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${access_token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_API_BASE_URL}/EnterExit/last/${companyobj._id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }, []);
  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    if (navigator.geolocation) {
      // navigator.permissions
      //   .query({ name: "geolocation" })
      //   .then(function (result) {
      //     if (result.state === "granted") {
      //       console.log(result.state);
      //       // navigator.geolocation.watchPosition(function (position) {
      //       //   map.current.flyTo({
      //       //     center: [position.coords.longitude, position.coords.latitude]
      //       //   });
      //       //   new mapboxgl.Marker().setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map.current)

      //       // });
      //       //If granted then you can directly call your function here
      //     } else if (result.state === "prompt") {
      //       console.log(result.state);
      //     } else if (result.state === "denied") {
      //       console.log(result.state);
      //     }

      //   });

      navigator.geolocation.watchPosition(function (position) {
        if (position.coords.accuracy < 20) {
          map.current.flyTo({
            center: [position.coords.longitude, position.coords.latitude]
          });
          marker.remove();
          let marker = new mapboxgl.Marker().setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map.current);
          setuserMarker(marker);
        }
      });
    }
  });
  return (
    <div className="background-container">
      <div className="traffic-main">
        <div className="traffic-container">
          <p className="trafic__text--header">شرکت {company.name} {x}</p>
          <svg className="traffic__bell--icon">
            <use href="../images/icon/sprite.svg#bell-solid"></use>
          </svg>
        </div>
        <div className="traffic__time--login">
          <div>
            <p className="traffic__text paragraph">
              شما در تاریخ 1401/09/15 در ساعت 9:37:41 وارد شدید
            </p>
            <div ref={mapContainer} className="map-container" />
            <p className="traffic__text2 paragraph">
              برای خروج دکمه اثر انگشت را نگه دارید
            </p>
          </div>
          <svg className="traffic__out--icon">
            <use href="../images/icon/sprite.svg#out"></use>
          </svg>
        </div>
        <button className="traffic__btn-container traffic__btn--size">
          <svg className="traffic__finger--icon">
            <use href="../images/icon/sprite.svg#fingerprint-solid"></use>
          </svg>
          <p className="tarffic__text--enter">برای خروج به چپ بکشید</p>
        </button>
      </div>
      <footer className="traffic__footer--container">
        <div className="traffic__footer--grid">
          <a
            className="hover__profile"
            href="../components/profile.html"
            id="style-2"
            data-replace="پروفایل"
          >
            <span>
              <svg className="traffic__user--icon">
                <use href="../images/icon/sprite.svg#user-regular"></use>
              </svg>
            </span>
          </a>
          <a
            className="hover__profile1"
            href="../components/request.html"
            id="style-2"
            data-replace="درخواست ها"
          >
            <span>
              <svg className="traffic__user--icon">
                <use href="../images/icon/sprite.svg#rectangle-list-regular"></use>
              </svg>
            </span>
          </a>
          <a
            className="hover__profile"
            href="#"
            id="style-2"
            data-replace="تردد"
          >
            <span>
              <svg className="traffic__user--icon">
                <use href="../images/icon/sprite.svg#fingerprint-solid"></use>
              </svg>
            </span>
          </a>
          <a
            className="hover__profile"
            href="#"
            id="style-2"
            data-replace="کارتابل"
          >
            <span>
              <svg className="traffic__user--icon">
                <use href="../images/icon/sprite.svg#window-restore-solid"></use>
              </svg>
            </span>
          </a>
          <a
            className="hover__profile"
            href="#"
            id="style-2"
            data-replace="حاضرین"
          >
            <span>
              <svg className="traffic__user--icon">
                <use href="../images/icon/sprite.svg#calendar-check-solid"></use>
              </svg>
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Traffic;
