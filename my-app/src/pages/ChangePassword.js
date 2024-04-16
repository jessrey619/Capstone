import * as React from "react";

function ChangePassword() {
  return (
    <div className="flex flex-col bg-white">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/910615ea83cd5ee7659ae65ff1c312ad9ff99d4bb962de3e2b2e771ca36ad2cf?apiKey=9109b7280ee1413784c03b4b33da37dc&width=1600"
        className="object-cover w-full"
        alt="Background"
      />
      <div className="relative flex flex-col items-center px-4 text-black">
        <div className="flex flex-col justify-center w-full pt-5 max-w-[1080px] min-h-screen max-md:max-w-full">
          <div className="flex flex-col items-center w-full text-xl font-bold text-center mb-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/aae94d615fb6be17b347498f9120bc1251ba94d63a6781d301d45400654ffdad?apiKey=9109b7280ee1413784c03b4b33da37dc&width=800"
              className="w-[60%] mb-5 max-md:w-full aspect-[5] object-cover"
              alt="Logo"
            />
            <div className="flex flex-col items-center w-full gap-5 max-w-full">
              <div>Home</div>
              <div>About Us</div>
            </div>
          </div>
          <div className="flex flex-col items-center w-full text-xl font-semibold bg-white rounded-3xl shadow-lg max-w-[60%]">
            <div className="self-center text-3xl font-bold">Change Password</div>
            <div className="mx-3.5 mt-5">
              <input
                type="password"
                className="w-full max-w-[70%] md:max-w-[300px] h-10 mt-1 rounded-md bg-neutral-200"
                placeholder="Enter Old Password"
              />
            </div>
            <div className="mx-3.5 mt-5">
              <input
                type="password"
                className="w-full max-w-[70%] md:max-w-[300px] h-10 mt-1 rounded-md bg-neutral-200"
                placeholder="Enter New Password"
              />
            </div>
            <div className="mx-3.5 mt-5">
              <input
                type="password"
                className="w-full max-w-[70%] md:max-w-[300px] h-10 mt-1 rounded-md bg-neutral-200"
                placeholder="Confirm New Password"
              />
            </div>
            <button className="self-center px-8 pt-3.5 pb-2 mt-9 font-bold text-center text-white bg-red-900 rounded-xl">Save Changes</button>
          </div>
        </div>
        <div className="relative px-4 py-2.5 mt-24 w-full bg-white max-md:mt-10">
          <div className="flex flex-col gap-5 max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9288037b4104014e1b8dda01d8b7fdd6dfcdf5d621e4e4e05e42381bff78af7?apiKey=9109b7280ee1413784c03b4b33da37dc&width=1200"
              className="w-full max-w-full aspect-[1.41] object-cover"
              alt="Image"
            />
            <div className="flex flex-col w-[31%] max-md:w-full">
              <div className="flex flex-col items-center text-xl leading-6 text-zinc-500">
                <div className="text-3xl font-semibold text-black">Contact Us</div>
                <div className="mt-7">N. Bacalso Avenue, Cebu City Philippines 6000</div>
                <div className="mt-7">+63 32 411 2000 (trunkline)</div>
                <div className="mt-6">info@cit.edu</div>
              </div>
            </div>
            <div className="flex flex-col w-[17%] max-md:w-full">
              <div className="flex flex-col items-center text-xl leading-6 text-zinc-500">
                <div className="text-3xl font-semibold text-black">Quick Links</div>
                <div className="mt-5 font-medium">Cit.edu</div>
                <div className="mt-3.5">Lair</div>
                <div className="mt-4">AIMS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
