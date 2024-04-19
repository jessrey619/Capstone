import React, { useState } from "react";
import "./EmailVerificationModal.css";
import Modal from '@mui/material/Modal';
import CountdownTimer from "./CountdownTimer";

export const EmailVerificationModal = ({ open, onClose }) => {
  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState(null);
  const [enterOTP, setEnterOTP] = useState(true);
  const [countdown, setCountdown] = useState(false);
  const [resend, setResend] = useState(false);
  const [showResendMessage, setShowResendMessage] = useState(false);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onOtpChange = (e) => {
    setOtp(e.target.value);
  }

  const startCountdown = () => {
    setCountdown(true);
    // Axios Function Here
  }

  const resendEmail = () => {
    setEnterOTP(true) 
    onComplete()
  }

  const onComplete = () => {
    setShowResendMessage(!showResendMessage)
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {enterOTP ? (
          <div className="modal-main-content">
            <input type="text" className="email" onChange={onEmailChange} placeholder="Enter Email" />
            <button className="btnGetOtp"
              onClick={() => {
                setEnterOTP(false);
                startCountdown()
                // Axios Function Here
              }}
            >Get OTP</button>
          </div>
        ) : (
          <div className="modal-main-content">
            <p>Code sent to <b>{email}</b></p>
            {resend ?(
            <>
              <input type="text" className="otp" onChange={onOtpChange} placeholder="Enter OTP" />
              <button className="btnSubmit">Submit</button>
              <button className="btnResend"
                onClick={() => {
                  
                }}>Resend</button>
            </>):(
            <>
              <input type="text" className="otp" onChange={onOtpChange} placeholder="Enter OTP" />

              {showResendMessage ?
                (
                <div>
                  {/* button that sends Code Again */}
                  <button className="btnSubmit">Submit</button>
                  <button className="resend" onClick={resendEmail}>Resend</button>
                </div>
                ):(
                <div className="countdown">
                  {countdown ? (<CountdownTimer onComplete={onComplete} />): (<></>) }
                  <button className="btnSubmit">Submit</button>
                </div>
                )}
            </>
            )} 
          </div>
        )}
      </Modal>
      
    </>
  )
}