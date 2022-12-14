import React, { Component } from "react";

class Profile extends Component {
  state = {};
  render() {
    return (
      <react-fragment>
        <div className="profile--container">
          <button className="profile__btn--changes">
            <a className="profile__text" href="">
              تغییر شرکت
            </a>
          </button>
          <p className="profile__text--middle">رفت و آمدهای من</p>
          <button className="profile__btn">
            <a className="profile__btn--text">خروج</a>
            <svg className="profile__out--icon">
              <use href="../images/icon/sprite.svg#out"></use>
            </svg>
          </button>
        </div>
        <div className="profile__lists">
          <svg className="profile__list_right--icon">
            <use href="../images/icon/sprite.svg#right-to-bracket-solid"></use>
          </svg>
          <svg className="calendar-check">
            <use href="../images/icon/sprite.svg#calendar-check-solid"></use>
          </svg>
          <p className="profile__date">1401/09/19</p>
          <svg className="calendar">
            <use href="../images/icon/sprite.svg#calendar-alt-svgrepo-com"></use>
          </svg>
          <p className="profile__time">9:22:39</p>
        </div>
        <div className="profile__lists2">
          <svg className="profile__list_out--icon">
            <use href="../images/icon/sprite.svg#out"></use>
          </svg>
          <svg className="calendar-check">
            <use href="../images/icon/sprite.svg#calendar-check-solid"></use>
          </svg>
          <p className="profile__date">1401/09/19</p>
          <svg className="calendar">
            <use href="../images/icon/sprite.svg#calendar-alt-svgrepo-com"></use>
          </svg>
          <p className="profile__time">9:22:39</p>
        </div>
        <footer className="traffic__footer--container">
          <div className="traffic__footer--grid">
            <a
              className="hover__profile"
              href="#"
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
      </react-fragment>
    );
  }
}

export default Profile;
