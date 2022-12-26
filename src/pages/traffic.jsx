import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import mapboxgl from 'mapbox-gl';
import ProgressBar from 'react-bootstrap/ProgressBar';
import haversine from 'haversine-distance'


function Traffic() {
  mapboxgl.accessToken = 'pk.eyJ1IjoidGVtcGVyb3J5IiwiYSI6ImNsYnV2bWtiMzFvcHgzb212c3F0YWJ4ZGoifQ.kVv9N0OjBaZClGM6p1jeVw';
  const mapContainer = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  const map = useRef(null);
  const [lng, setLng] = useState(60);
  const [lat, setLat] = useState(35);
  const [userMarker, setuserMarker] = useState(null);
  const [zoom, setZoom] = useState(13);
  const [companyLocations, setcompanyLocations] = useState([]);
  const [x, setx] = useState('');
  const [buttonDisable, setbuttonDisable] = useState(true);
  const [coords, setCoords] = useState('');
  const navigate = useNavigate();
  const [company, SetCompany] = useState('');
  const [currentLocation, SetcurrentLocation] = useState('');
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
  // useEffect(() => {
  //   const access_token = localStorage.getItem("access_token");
  //   const companyobj = JSON.parse(localStorage.getItem("company"));
  //   SetCompany(companyobj);

  //   var myHeaders = new Headers();
  //   myHeaders.append("Authorization", `Bearer ${access_token}`);
  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };
  //   fetch(`${process.env.REACT_APP_API_BASE_URL}/companyLocation/company/${companyobj._id}`, requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => {
  //       setcompanyLocations(JSON.parse(result));
  //       console.log("c", JSON.parse(result))
  //     })
  //     .catch((error) => console.log("error", error));
  // }, []);
  useEffect(() => {

    if (map.current) return; // initialize map only once
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

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    fetch(`${process.env.REACT_APP_API_BASE_URL}/companyLocation/company/${companyobj._id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let cls = JSON.parse(result);
        if (navigator.geolocation) {
          var marker = null;

          navigator.geolocation.watchPosition(function (position) {
            setCoords(JSON.stringify(position.coords) );
            map.current.flyTo({
              center: [position.coords.longitude, position.coords.latitude]
            });
            // console.log("yy", companyLocations)
            for (let index = 0; index < cls.length; index++) {
              const companyLocation = cls[index];
              const cl = { lat: companyLocation.long, lng: companyLocation.lat }
              const ul = { lat: position.coords.latitude, lng: position.coords.longitude }
              console.log("cl",cl)
              console.log("ul",ul)
              // 714504.18 (in meters)
              console.log(haversine(cl, ul)) // 714504.18 (in meters)
              if (haversine(cl, ul) < companyLocation.radius) {
                setbuttonDisable(false);
                SetcurrentLocation(companyLocation.name)
                break;
              }
            }
            if (marker) {
              marker.remove();
            }

            marker = new mapboxgl.Marker().setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map.current);
            console.log("y", marker);
            // setuserMarker(marker);
            // console.log("x",userMarker);
            // }
          });
        }
        console.log("c", JSON.parse(result))
      })
      .catch((error) => console.log("error", error));


  });
  return (
    <div className="background-container">
      <div className="traffic-main">
        <div className="traffic-container">
          <p className="trafic__text--header">شرکت {company.name} {coords}</p>
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
          </div>
          <svg className="traffic__out--icon">
            <use href="../images/icon/sprite.svg#out"></use>
          </svg>
        </div>
        <button disabled={buttonDisable} className="traffic__btn-container traffic__btn--size" onClick={() => {

        }}>
          <svg className="traffic__finger--icon">
            <use href="../images/icon/sprite.svg#fingerprint-solid"></use>
          </svg>
          <p className="tarffic__text--enter">برای خروج {currentLocation} کلیک کنید</p>
        </button>
        {/* <ProgressBar now={60} label={`${60}%`} />; */}
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
