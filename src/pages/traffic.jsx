import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import mapboxgl from 'mapbox-gl';
import ProgressBar from 'react-bootstrap/ProgressBar';
import haversine from 'haversine-distance'
import { serverAPI } from "../apis/service"

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
  const [lastStateMessage, setLastStateMessage] = useState('Loading...');
  const [nextState, setNextState] = useState('');
  const [btText, setBtText] = useState('موقعیت شما تایید نشد');
  const [buttonDisable, setbuttonDisable] = useState(true);
  const [coords, setCoords] = useState('');
  const navigate = useNavigate();
  const [company, SetCompany] = useState('');
  const [currentLocation, SetcurrentLocation] = useState('');

  const handleClick = async () => {

    serverAPI.enterExit(company._id, currentLocation._id, nextState).then((response) => {
      if (nextState == "Enter") {
        setNextState("Exit")
      }
      else {
        setNextState("Enter")
      }

    }).catch((err) => {
      alert(err)
    })
  };

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
    serverAPI.lastEnterExitState(companyobj._id).then((lastEnterExitState) => {
      serverAPI.companyLocation(companyobj._id).then((companyLocations) => {
        let enterExitState = '';
        if (lastEnterExitState.type == "Absent") {
          setLastStateMessage("امروز ورود نزده اید");
          enterExitState = "ورود به ";
          setNextState("Enter")
        }
        else {
          alert(lastEnterExitState.type)
          if (lastEnterExitState.type == "Enter") {
            setLastStateMessage(`شما ${new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(lastEnterExitState.date)} وارد شدید`);
            enterExitState = "خروج از ";
            setNextState("Exit")
          }
          else {
            setLastStateMessage(`شما ${new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(lastEnterExitState.date)} خارج شدید`);
            enterExitState = "ورود به ";
            setNextState("Enter")
          }

        }
        if (navigator.geolocation) {
          var marker = null;
          navigator.geolocation.watchPosition(function (position) {
            setCoords(JSON.stringify(position.coords));
            map.current.flyTo({
              center: [position.coords.longitude, position.coords.latitude]
            });
            for (let index = 0; index < companyLocations.length; index++) {
              const companyLocation = companyLocations[index];
              const cl = { lat: companyLocation.long, lng: companyLocation.lat }
              const ul = { lat: position.coords.latitude, lng: position.coords.longitude }
              if (true) { // if (haversine(cl, ul) < companyLocation.radius) {
                setbuttonDisable(false);
                SetcurrentLocation(companyLocation);
                let txt = `برای ${enterExitState} دفتر ${companyLocation.name} دکمه را بزنید`;
                setBtText(txt);
              }
              else {
                setbuttonDisable(true);
                setBtText('موقعیت شما تایید نشد')
              }
            }
            if (marker) {
              marker.remove();
            }
            marker = new mapboxgl.Marker().setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map.current);
          });
        }

      }).catch((reson) => {

      })
    }).catch((reson) => {

    })
  });
  return (
    <div className="background-container">
      <div className="traffic-main">
        <div className="traffic-container">
          <p className="trafic__text--header">شرکت {company.name} </p>
          <svg className="traffic__bell--icon">
            <use href="../images/icon/sprite.svg#bell-solid"></use>
          </svg>
        </div>
        <div className="traffic__time--login">
          <div>
            <p className="traffic__text paragraph">
              {lastStateMessage}
            </p>
          </div>

          <svg className="traffic__out--icon">
            <use href="../images/icon/sprite.svg#out"></use>
          </svg>
        </div>
        <div ref={mapContainer} className="map-container" />

        <button disabled={buttonDisable} className="traffic__btn-container traffic__btn--size" onClick={
          handleClick
        }>
          <svg className="traffic__finger--icon">
            <use href="../images/icon/sprite.svg#fingerprint-solid"></use>
          </svg>
          <p className="tarffic__text--enter">{btText}</p>
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
