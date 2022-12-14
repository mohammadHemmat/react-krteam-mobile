import React, { Component } from "react";

class Traffic extends Component {
  state = {};
  render() {
    return (
      <div className="background-container">
        <div className="traffic-main">
          <div className="traffic-container">
            <p className="trafic__text--header">شرکت مدریک (...)</p>
            <svg className="traffic__bell--icon">
              <use href="../images/icon/sprite.svg#bell-solid"></use>
            </svg>
          </div>
          <div className="traffic__time--login">
            <div>
              <p className="traffic__text paragraph">
                شما در تاریخ 1401/09/15 در ساعت 9:37:41 وارد شدید
              </p>
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
}

export default Traffic;
