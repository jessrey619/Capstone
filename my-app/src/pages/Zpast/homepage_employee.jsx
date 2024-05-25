import * as React from "react";

function Homepage_Employee() {
  const [dashboard, setDashboard] = React.useState("Dashboard")
    const [Profile, setProfile] = React.useState("Profile")
    const clickSample = () => {
        alert("bitchOten");
    }
  return (
    <>
      <div className="div">
        <div className="div-2">
          <img
            loading="lazy"
            srcSet="cit-logo.png"
            className="img"
          />
          <div className="div-3">
            <div className="div-4">Home</div>
            <div className="div-5">About Us</div>
          </div>
        </div>
        <div className="div-6">
          <div className="div-7">
            <div className="column">
              {/* <div className="div-8">Profile</div> */}
              <button
                      onClick={clickSample}
                    >
                        Profile
                    </button>
            </div>
            <div className="column-2">
              {/* {<div className="div-9">Dashboard</div>} */}
              <button
                      onClick={clickSample}
                    >
                        Dashboard
                    </button>
            </div>
          </div>
        </div>
        {/* <div className="div-10">Employee Features</div> */}
        <button
                      onClick={clickSample}
                    >
                        Employee Features
                    </button>
        <div className="div-11">
          <div className="div-12">
            <div className="column-3">
              <img
                loading="lazy"
                srcSet="footer-logo.png"
                className="img-2"
              />
            </div>
            <div className="column-4">
              <div className="div-13">
                <div className="div-14">Contact Us</div>
                <div className="div-15">
                  N. Bacalso Avenue, Cebu City Philippines 6000
                </div>
                <div className="div-16">+63 32 411 2000(trunkline)</div>
                <div className="div-17">info@cit.edu</div>
              </div>
            </div>
            <div className="column-5">
              <div className="div-18">
                <div className="div-19">Quick Links</div>
                <div className="div-20">Cit.edu</div>
                <div className="div-21">Lair</div>
                <div className="div-22">AIMS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          background-color: #fcfcfc;
          display: flex;
          flex-direction: column;
        }
        .div-2 {
          background-color: #fff;
          display: flex;
          width: 100%;
          align-items: flex-start;
          gap: 20px;
          font-size: 20px;
          color: #000;
          font-weight: 700;
          text-align: center;
          justify-content: space-between;
          padding: 7px 80px 0;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
            flex-wrap: wrap;
            padding: 0 20px;
          }
        }
        .img {
          aspect-ratio: 5;
          object-fit: auto;
          object-position: center;
          width: 478px;
          align-self: start;
        }
        @media (max-width: 991px) {
          .img {
            max-width: 100%;
          }
        }
        .div-3 {
          display: flex;
          gap: 20px;
          justify-content: space-between;
          margin: auto 0;
        }
        .div-4 {
          font-family: Kumbh Sans, sans-serif;
        }
        .div-5 {
          font-family: Kumbh Sans, sans-serif;
        }
        .div-6 {
          align-self: center;
          margin-top: 147px;
          width: 991px;
          max-width: 100%;
        }
        @media (max-width: 991px) {
          .div-6 {
            margin-top: 40px;
          }
        }
        .div-7 {
          gap: 20px;
          display: flex;
        }
        .div-7 button {
          width:100%;
            font-size: 200%;
            font-weight: bold;
            background-color: #8A252C;
            color: white;
            border-radius: 30px;
            padding-top: 35%;
            padding-bottom: 35%
        }
        @media (max-width: 991px) {
          .div-7 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 31%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column {
            width: 100%;
          }
        }
        .div-8 {
          border-radius: 20px;
          background-color: #8a252c;
          flex-grow: 1;
          align-items: center;
          color: #fff;
          white-space: nowrap;
          text-align: center;
          justify-content: center;
          width: 100%;
          padding: 122px 60px 80px;
          font: 700 32px Kumbh Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-8 button {
          width:100%;
            font-size: 200%;
            font-weight: bold;
            background-color: #5f191e;
            color: white;
            border-radius: 30px;
            padding-top: 35%;
            padding-bottom: 35%
        }
        @media (max-width: 991px) {
          .div-8 {
            margin-top: 20px;
            white-space: initial;
            padding: 40px 20px 0;
          }
        }
        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 69%;
          margin-left: 20px;
        }
        .column-2 button {
          width:100%;
            font-size: 200%;
            font-weight: bold;
            background-color: #5f191e;
            color: white;
            border-radius: 30px;
            padding-top: 20%;
            padding-bottom: 12%
        }
        @media (max-width: 991px) {
          .column-2 {
            width: 100%;
          }
        }
        .div-9 {
          border-radius: 20px;
          background-color: #5f191e;
          margin-top: 5px;
          flex-grow: 1;
          align-items: center;
          color: #fff;
          white-space: nowrap;
          text-align: center;
          justify-content: center;
          width: 100%;
          padding: 115px 60px 80px;
          font: 700 36px Kumbh Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-9 button {
          width:100%;
            font-size: 100%;
            font-weight: bold;
            background-color: #5f191e;
            color: white;
            border-radius: 20px;
            padding-top: 5%;
            padding-bottom: 25%
        }
        @media (max-width: 991px) {
          .div-9 {
            max-width: 100%;
            margin-top: 25px;
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-10 {
          border-radius: 20px;
          background-color: #f4c522;
          align-self: center;
          margin-top: 18px;
          width: 991px;
          max-width: 100%;
          align-items: center;
          color: #000;
          text-align: center;
          justify-content: center;
          padding: 117px 60px 92px;
          font: 700 36px Kumbh Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-10 button {
          width:100%;
            font-size: 200%;
            font-weight: bold;
            background-color: #5f191e;
            color: white;
            border-radius: 30px;
            padding-top: 35%;
            padding-bottom: 35%
        }
        @media (max-width: 991px) {
          .div-10 {
            padding: 0 20px;
          }
        }
        .div-11 {
          background-color: #fff;
          margin-top: 197px;
          width: 100%;
          padding: 9px 76px;
        }
        @media (max-width: 991px) {
          .div-11 {
            max-width: 100%;
            margin-top: 40px;
            padding: 0 20px;
          }
        }
        .div-12 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-12 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column-3 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 52%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column-3 {
            width: 100%;
          }
        }
        .img-2 {
          aspect-ratio: 1.41;
          object-fit: auto;
          object-position: center;
          width: 332px;
          max-width: 100%;
          flex-grow: 1;
        }
        @media (max-width: 991px) {
          .img-2 {
            margin-top: 40px;
          }
        }
        .column-4 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 31%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-4 {
            width: 100%;
          }
        }
        .div-13 {
          display: flex;
          flex-direction: column;
          align-self: stretch;
          font-size: 20px;
          color: #7d7d7d;
          font-weight: 400;
          text-align: center;
          line-height: 124%;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .div-13 {
            margin-top: 40px;
          }
        }
        .div-14 {
          color: #000;
          align-self: center;
          font: 600 30px Kumbh Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-15 {
          font-family: Kumbh Sans, sans-serif;
          line-height: 25px;
          margin-top: 27px;
        }
        .div-16 {
          font-family: Kumbh Sans, sans-serif;
          margin-top: 27px;
        }
        .div-17 {
          font-family: Kumbh Sans, sans-serif;
          align-self: center;
          margin-top: 23px;
        }
        .column-5 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 17%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-5 {
            width: 100%;
          }
        }
        .div-18 {
          display: flex;
          margin-top: 26px;
          flex-direction: column;
          align-items: center;
          font-size: 20px;
          color: #7d7d7d;
          font-weight: 400;
          text-align: center;
          line-height: 124%;
        }
        @media (max-width: 991px) {
          .div-18 {
            margin-top: 40px;
          }
        }
        .div-19 {
          color: #000;
          align-self: stretch;
          font: 600 30px Kumbh Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-20 {
          font-family: Kumbh Sans, sans-serif;
          font-weight: 500;
          margin-top: 18px;
        }
        .div-21 {
          font-family: Kumbh Sans, sans-serif;
          margin-top: 14px;
        }
        .div-22 {
          font-family: Kumbh Sans, sans-serif;
          margin-top: 15px;
        }
      `}</style>
    </>
  );
}


export default Homepage_Employee;