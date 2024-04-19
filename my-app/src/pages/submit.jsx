import * as React from "react";

function Submit() {
  return (
    <>
      <div className="div">
        <div className="div-2">
          <img
            loading="lazy"
            srcSet="..."
            alt=""
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
              <div className="div-8">Profile</div>
            </div>
            <div className="column-2">
              <div className="div-9">Status</div>
            </div>
          </div>
        </div>
        <div className="div-10">
          <div className="div-11">
            <div className="column-3">
              <div className="div-12">
                <div className="div-13">
                  <div className="column-4">
                    <div className="div-14">
                      <div className="div-15">Disclaimer</div>
                      <div className="div-16">
                        Release of stickers starts on Monday!{" "}
                      </div>
                    </div>
                  </div>
                  <div className="column-5">
                    <div className="div-17">
                      <div className="div-18">
                        <div className="div-19">Submit Proof of Payment</div>
                        <div className="div-20">Upload</div>
                        <div className="div-21">Submit</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column-6">
              <div className="div-22">Register/Renewal</div>
            </div>
          </div>
        </div>
        <div className="div-23">
          <div className="div-24">
            <div className="column-7">
              <div className="div-25">
                <div className="div-26">Contact Us</div>
                <div className="div-27">
                  N. Bacalso Avenue, Cebu City Philippines 6000
                </div>
                <div className="div-28">+63 32 411 2000(trunkline)</div>
                <div className="div-29">info@cit.edu</div>
              </div>
            </div>
            <div className="column-8">
              <div className="div-30">
                <div className="div-31">Quick Links</div>
                <div className="div-32">Cit.edu</div>
                <div className="div-33">Lair</div>
                <div className="div-34">AIMS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          background-color: rgba(217, 217, 217, 0.5);
          z-index: 10;
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
          padding: 10px 80px 29px;
        }
        @media (max-width: 991px) {
          .div {
            max-width: 100%;
            padding: 0 20px;
          }
        }
        .div-2 {
          display: flex;
          width: 100%;
          max-width: 1667px;
          gap: 20px;
          font-size: 20px;
          color: #000;
          font-weight: 700;
          text-align: center;
          justify-content: space-between;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
            flex-wrap: wrap;
          }
        }
        .img {
          aspect-ratio: 5;
          object-fit: auto;
          object-position: center;
          width: 478px;
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
          margin-top: 134px;
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
          padding: 124px 60px 80px;
          font: 700 32px Kumbh Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
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
          width: 100%;
          padding: 31px 60px 80px;
          font: 600 36px Kumbh Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
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
          margin-top: 18px;
          width: 991px;
          max-width: 100%;
        }
        .div-11 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-11 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column-3 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 69%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column-3 {
            width: 100%;
          }
        }
        .div-12 {
          border-radius: 20px;
          background-color: #f4c522;
          flex-grow: 1;
          width: 100%;
          padding: 0 0 67px 31px;
        }
        @media (max-width: 991px) {
          .div-12 {
            max-width: 100%;
            margin-top: 30px;
          }
        }
        .div-13 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-13 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column-4 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 34%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column-4 {
            width: 100%;
          }
        }
        .div-14 {
          display: flex;
          margin-top: 31px;
          flex-direction: column;
          font-size: 32px;
          color: #000;
        }
        @media (max-width: 991px) {
          .div-14 {
            max-width: 100%;
          }
        }
        .div-15 {
          text-align: center;
          font-family: Kumbh Sans, sans-serif;
          font-weight: 700;
        }
        @media (max-width: 991px) {
          .div-15 {
            max-width: 100%;
          }
        }
        .div-16 {
          font-family: Kumbh Sans, sans-serif;
          font-weight: 600;
          margin-top: 54px;
        }
        @media (max-width: 991px) {
          .div-16 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .column-5 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 66%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-5 {
            width: 100%;
          }
        }
        .div-17 {
          z-index: 10;
          display: flex;
          margin-top: -204px;
          flex-grow: 1;
          flex-direction: column;
          font-size: 20px;
          color: #000;
          font-weight: 700;
          text-align: center;
          line-height: 124%;
          justify-content: center;
          padding: 10px;
        }
        @media (max-width: 991px) {
          .div-17 {
            max-width: 100%;
            margin-top: -200px;
          }
        }
        .div-18 {
          background-color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 54px 80px;
        }
        @media (max-width: 991px) {
          .div-18 {
            max-width: 100%;
            padding: 0 20px;
          }
        }
        .div-19 {
          font-family: Kumbh Sans, sans-serif;
        }
        .div-20 {
          font-family: Kumbh Sans, sans-serif;
          border-radius: 67px;
          background-color: #d9d9d9;
          margin-top: 98px;
          width: 191px;
          max-width: 100%;
          align-items: center;
          white-space: nowrap;
          justify-content: center;
          padding: 11px 60px;
        }
        @media (max-width: 991px) {
          .div-20 {
            margin-top: 40px;
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-21 {
          color: #fff;
          text-align: justify;
          font-family: Kumbh Sans, sans-serif;
          margin-top: 107px;
        }
        @media (max-width: 991px) {
          .div-21 {
            margin-top: 40px;
          }
        }
        .column-6 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 31%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-6 {
            width: 100%;
          }
        }
        .div-22 {
          width: 100%;
          border-radius: 20px;
          background-color: #efefef;
          flex-grow: 1;
          align-items: center;
          color: #000;
          white-space: nowrap;
          text-align: center;
          justify-content: center;
          padding: 101px 60px 80px;
          font: 700 32px Kumbh Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-22 {
            margin-top: 30px;
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-23 {
          margin-top: 232px;
          width: 549px;
          max-width: 100%;
        }
        @media (max-width: 991px) {
          .div-23 {
            margin-top: 40px;
          }
        }
        .div-24 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-24 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column-7 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 67%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column-7 {
            width: 100%;
          }
        }
        .div-25 {
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          font-size: 20px;
          color: #7d7d7d;
          font-weight: 400;
          text-align: center;
          line-height: 124%;
        }
        @media (max-width: 991px) {
          .div-25 {
            margin-top: 40px;
          }
        }
        .div-26 {
          color: #000;
          align-self: center;
          font: 600 30px Kumbh Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-27 {
          font-family: Kumbh Sans, sans-serif;
          line-height: 25px;
          margin-top: 27px;
        }
        .div-28 {
          font-family: Kumbh Sans, sans-serif;
          margin-top: 27px;
        }
        .div-29 {
          font-family: Kumbh Sans, sans-serif;
          align-self: center;
          margin-top: 23px;
        }
        .column-8 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 33%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-8 {
            width: 100%;
          }
        }
        .div-30 {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 20px;
          color: #7d7d7d;
          font-weight: 400;
          text-align: center;
          line-height: 124%;
        }
        @media (max-width: 991px) {
          .div-30 {
            margin-top: 40px;
          }
        }
        .div-31 {
          color: #000;
          align-self: stretch;
          font: 600 30px Kumbh Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-32 {
          font-family: Kumbh Sans, sans-serif;
          font-weight: 500;
          margin-top: 18px;
        }
        .div-33 {
          font-family: Kumbh Sans, sans-serif;
          margin-top: 14px;
        }
        .div-34 {
          font-family: Kumbh Sans, sans-serif;
          margin-top: 15px;
        }
      `}</style>
    </>
  );
}


export default Submit;