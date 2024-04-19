import { useState } from "react";
<<<<<<< HEAD
import { EmailVerificationModal } from "../Components/ModalEmailVerification/EmailVerificationModal";
import "../CSS/EmailVerification.css"
=======
import { EmailVerificationModal } from '../Components/ModalEmailVerification/EmailVerificationModal';
import '../CSS/EmailVerification.css'
>>>>>>> origin

function EmailVerification() {

  const [openEVModal, setOpenEVModal] = useState(false);

  return (
    <>
    {/* Modal Verification Button Part */}
    <button
      className="btnNewRegistration"
      onClick={(e)=>{
        setOpenEVModal(true);
      }}
    >
      <img className="icon" src="../newRegistrationLogo.png"/>
      <br />
      New Registration
    </button>
      <EmailVerificationModal
        open={openEVModal}
        onClose={() => {
          setOpenEVModal(false)
          
        }}
      />
    {/* Modal Verification Button Part */}

    </>
  );
}

export default EmailVerification;