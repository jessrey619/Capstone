import React from 'react'
// import '../../pages/user_login/LoginBgm.css';
import login_background from "../../../../../assets/login_background.jpeg"
import loginWheel from "../../../../../assets/loginWheel.jpg"
import { Container, Grid, Typography } from '@mui/material'
import PassCard from '../ChangePass/PassCard'
import ForgetPasswordCard from './ForgetPasswordCard'
import TheHeader from '../../../../../Components/Header/UserHeader';
import TheFooter from '../../../../../Components/Footer/Footer';

export default function ChangePass() {
  return (
    <main className='main-content'>
      <div >

        {/* <Container maxWidth="lg"  > */}
        {/* <img src={login_background} alt="background2" className="bkg2" /> */}
        <Grid container xs={12} >
        <div style={{ position: 'absolute', top: 0, width: '95%', zIndex: 1 }}>
            {/* <AdminHeader /> */}
            <TheHeader />
          </div>
          <Grid item xs={7} style={{
            backgroundImage: `url(${login_background})`,
            filter: 'blur(.1rem)',
            backgroundSize: '100% 100%',
            minHeight: '100vh',
          }}>


          </Grid>
          <Grid item xs={5} style={{
            backgroundImage: `url(${loginWheel})`,
            backgroundSize: '100% 100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
          }}>
            {/* <PassCard /> */}
            <ForgetPasswordCard />
          </Grid>
          <div style={{ position: 'absolute', bottom: 0, width: '100%',mt:'20rem' }}>
            <TheFooter />
          </div>
        </Grid>

        {/* </Container> */}

      </div>
    </main>
  )
}

