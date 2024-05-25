import React from "react";

function Header() {
  return (
    <div className="absolute top-0 left-0 right-0 flex flex-col justify-center items-center mb-5 max-md:mb-10">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/aae94d615fb6be17b347498f9120bc1251ba94d63a6781d301d45400654ffdad?apiKey=9109b7280ee1413784c03b4b33da37dc&width=200px"
        className="w-full mb-5 max-w-[200px]"
        alt="Logo"
        
      />
      <div className="flex gap-5 justify-between w-full">
        <div>Home</div>
        <div>About Us</div>
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <div className="flex flex-col px-4 text-lg font-bold">
      <div className="mb-2">Username:</div>
      <input type="text" className="input-field mb-4" />
      <div className="mb-2">Password:</div>
      <input type="password" className="input-field mb-4" />
      <div className="error-message mb-4">Incorrect username/password</div>
      <button className="login-button">Login</button>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center mt-10 max-w-full">
      <div className="flex flex-col items-center mb-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9288037b4104014e1b8dda01d8b7fdd6dfcdf5d621e4e4e05e42381bff78af7?apiKey=9109b7280ee1413784c03b4b33da37dc&width=200px"
          className="w-full mb-5"
          alt="Map"
        />
        <div className="text-lg text-center">
          <div className="font-semibold">Contact Us</div>
          <div>N. Bacalso Avenue, Cebu City Philippines 6000</div>
          <div>+63 32 411 2000 (trunkline)</div>
          <div>info@cit.edu</div>
        </div>
      </div>
      <div className="flex flex-col items-center mb-5">
        <div className="font-semibold mb-2">Quick Links</div>
        <div className="font-medium mb-2">Cit.edu</div>
        <div className="font-medium mb-2">Lair</div>
        <div className="font-medium">AIMS</div>
      </div>
    </div>
  );
}

function Login() {
  return (
    <div className="relative bg-white">
      <Header />
      {/* <div
        style={{width:'60%'}}
      >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/88ea0b27dfbe395b32570d21f9b483aeaf5d5be281190f53abef551f31f43ca8?apiKey=9109b7280ee1413784c03b4b33da37dc&width=100%"
        className="object-cover w-full h-full"
        alt="Background"
        style={{width:"100%"}}
      />
      </div> */}
      
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center px-4 text-black">
        
        <div className="flex flex-col py-10 mt-5 bg-white rounded-3xl shadow-lg max-w-[80%]">
          <LoginForm />
          <div className="self-start mt-4 text-sm text-center">
            Forgot your password?{" "}
            <span className="font-semibold">Click Here</span>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
