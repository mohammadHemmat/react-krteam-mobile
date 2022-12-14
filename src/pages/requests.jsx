import React, { Component } from "react";

class Requests extends Component {
  state = {};
  render() {
    return (
      <div className="background-container">
        <div className="request-grid">
          <div className="request__mug-grid">
            <svg className="request__mug--icon">
              <use href="../images/icon/sprite.svg#mug-saucer-solid"></use>
            </svg>
            <div className="request__rest">
              <a className="request__text" href="">
                درخواست مرخصی
              </a>
              <div className="request__date--calendar">
                <svg className="request__calendar--icon">
                  <use href="../images/icon/sprite.svg#calendar-check-solid"></use>
                </svg>
                <a className="request__date" href="">
                  1401/9/18
                </a>
                <svg className="request__calendar--icon">
                  <use href="../images/icon/sprite.svg#calendar-alt-svgrepo-com"></use>
                </svg>
                <a className="request__date" href="">
                  2 ساعت
                </a>
              </div>
            </div>
          </div>
          <svg className="request__clock--icon">
            <use href="../images/icon/sprite.svg#clock-svgrepo-com"></use>
          </svg>
          <div className="request__mug-grid">
            <svg className="request__mug--icon">
              <use href="../images/icon/sprite.svg#mug-saucer-solid"></use>
            </svg>
            <div className="request__rest">
              <a className="request__text" href="">
                درخواست مرخصی
              </a>
              <div className="request__date--calendar">
                <svg className="request__calendar--icon">
                  <use href="../images/icon/sprite.svg#calendar-check-solid"></use>
                </svg>
                <a className="request__date" href="">
                  1401/9/18
                </a>
                <svg className="request__calendar--icon">
                  <use href="../images/icon/sprite.svg#calendar-alt-svgrepo-com"></use>
                </svg>
                <a className="request__date" href="">
                  2 ساعت
                </a>
              </div>
            </div>
          </div>
          <svg className="request__clock2--icon">
            <use href="../images/icon/sprite.svg#clock-svgrepo-com"></use>
          </svg>
          <div className="request__mug-grid">
            <svg className="request__mug--icon">
              <use href="../images/icon/sprite.svg#fingerprint-solid"></use>
            </svg>
            <div className="request__rest">
              <a className="request__text" href="">
                درخواست ورود
              </a>
              <div className="request__date--calendar">
                <svg className="request__calendar--icon">
                  <use href="../images/icon/sprite.svg#calendar-check-solid"></use>
                </svg>
                <a className="request__date" href="">
                  1401/9/18
                </a>
                <svg className="request__calendar--icon">
                  <use href="../images/icon/sprite.svg#calendar-alt-svgrepo-com"></use>
                </svg>
                <a className="request__date" href="">
                  2 ساعت
                </a>
              </div>
            </div>
          </div>
          <svg className="request__clock3--icon">
            <use href="../images/icon/sprite.svg#clock-svgrepo-com"></use>
          </svg>
          <svg className="request__plus--icon">
            <use href="../images/icon/sprite.svg#circle-plus-solid"></use>
          </svg>
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
              href="#"
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
              href="../components/traffic.html"
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
}

export default Requests;
