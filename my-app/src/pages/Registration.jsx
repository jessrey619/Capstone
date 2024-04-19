import * as React from "react";

function Registration() {
  return (
    <div className="flex flex-col py-2 bg-white">
      {/* Header section */}
      <div className="flex flex-col self-center px-5 w-full font-bold text-center text-black max-w-[1667px]">
        <div className="flex gap-5 justify-between w-full text-xl flex-wrap">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/aae94d615fb6be17b347498f9120bc1251ba94d63a6781d301d45400654ffdad?apiKey=9109b7280ee1413784c03b4b33da37dc&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/aae94d615fb6be17b347498f9120bc1251ba94d63a6781d301d45400654ffdad?apiKey=9109b7280ee1413784c03b4b33da37dc&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/aae94d615fb6be17b347498f9120bc1251ba94d63a6781d301d45400654ffdad?apiKey=9109b7280ee1413784c03b4b33da37dc&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/aae94d615fb6be17b347498f9120bc1251ba94d63a6781d301d45400654ffdad?apiKey=9109b7280ee1413784c03b4b33da37dc&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/aae94d615fb6be17b347498f9120bc1251ba94d63a6781d301d45400654ffdad?apiKey=9109b7280ee1413784c03b4b33da37dc&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/aae94d615fb6be17b347498f9120bc1251ba94d63a6781d301d45400654ffdad?apiKey=9109b7280ee1413784c03b4b33da37dc&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/aae94d615fb6be17b347498f9120bc1251ba94d63a6781d301d45400654ffdad?apiKey=9109b7280ee1413784c03b4b33da37dc&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/aae94d615fb6be17b347498f9120bc1251ba94d63a6781d301d45400654ffdad?apiKey=9109b7280ee1413784c03b4b33da37dc&"
            className="aspect-[5] w-[100%]"
          />
          <div className="flex gap-5 justify-between my-auto">
            <div>Home</div>
            <div>About Us</div>
          </div>
        </div>
        <div className="self-center mt-1.5 text-3xl">
          APPLICATION FORM FOR VEHICLE STICKER - PARKING ONLY
        </div>
      </div>

      {/* Form section */}
      <div className="flex flex-col px-5 mt-14 w-full max-w-[100%]">
        <div className="flex flex-col px-5 pt-5 pb-10 text-xl font-bold text-center bg-amber-400 rounded-3xl">
          {/* Personal data section */}
          <div className="self-center text-3xl text-black">PERSONAL DATA</div>
          {/* Input fields for personal data */}
          <div className="flex flex-col gap-5 mt-5 text-neutral-500">
            <div className="text-black">Name of Applicant/Driver:</div>
            <input type="text" className="py-2.5 rounded-xl bg-zinc-100" placeholder="Surname" />
            <input type="text" className="py-2.5 rounded-xl bg-zinc-100" placeholder="Given Name" />
            <input type="text" className="py-2.5 rounded-xl bg-zinc-100" placeholder="M.I." />
          </div>
          {/* Additional input fields for personal data */}
          <input type="text" className="flex gap-5 mt-5 text-black grow" placeholder="Name of Student:" />
          <input type="text" className="flex gap-5 mt-5 text-black grow" placeholder="ID Number:" />
          <input type="text" className="flex gap-5 mt-5 text-black grow" placeholder="Grade/Year Level:" />
          <input type="text" className="flex gap-5 mt-5 text-black grow" placeholder="Contact No.:" />
          <input type="text" className="flex gap-5 mt-5 text-black grow" placeholder="Address:" />

          {/* Vehicle data section */}
          <div className="self-center text-3xl text-black mt-5">VEHICLE DATA</div>
          {/* Input fields for vehicle data */}
          <input type="text" className="flex gap-5 mt-5 text-black grow" placeholder="Vehicle Make:" />
          <input type="text" className="flex gap-5 mt-5 text-black grow" placeholder="Plate No:" />
          <input type="text" className="flex gap-5 mt-5 text-black grow" placeholder="Color:" />

          {/* Additional input fields for vehicle data */}
          <div className="flex flex-col gap-5 mt-5">
            <div className="text-black">Vehicle Type:</div>
            <div className="flex gap-2.5">
              <input type="radio" id="2-wheeler" name="vehicle-type" value="2-Wheeler" />
              <label htmlFor="2-wheeler">2-Wheeler</label>
            </div>
            <div className="flex gap-2">
              <input type="radio" id="4-wheeler" name="vehicle-type" value="4-Wheeler" />
              <label htmlFor="4-wheeler">4-Wheeler</label>
            </div>
          </div>
          <div className="flex justify-between gap-5 mt-5">
            <div className="flex gap-2.5">
              <div className="text-black">OR/CR:</div>
              <button className="text-amber-400 bg-red-900 rounded-3xl">upload</button>
            </div>
            <div className="flex gap-2">
              <div className="text-black">License:</div>
              <button className="text-amber-400 bg-red-900 rounded-3xl">upload</button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="justify-center items-center self-end px-5 py-3 mt-5 text-2xl text-white bg-red-900 rounded-xl max-w-[100%]">
        Submit
      </div>

      {/* Footer section */}
      <div className="max-w-[100%]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f9288037b4104014e1b8dda01d8b7fdd6dfcdf5d621e4e4e05e42381bff78af7?apiKey=9109b7280ee1413784c03b4b33da37dc&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f9288037b4104014e1b8dda01d8b7fdd6dfcdf5d621e4e4e05e42381bff78af7?apiKey=9109b7280ee1413784c03b4b33da37dc&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f9288037b4104014e1b8dda01d8b7fdd6dfcdf5d621e4e4e05e42381bff78af7?apiKey=9109b7280ee1413784c03b4b33da37dc&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f9288037b4104014e1b8dda01d8b7fdd6dfcdf5d621e4e4e05e42381bff78af7?apiKey=9109b7280ee1413784c03b4b33da37dc&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f9288037b4104014e1b8dda01d8b7fdd6dfcdf5d621e4e4e05e42381bff78af7?apiKey=9109b7280ee1413784c03b4b33da37dc&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f9288037b4104014e1b8dda01d8b7fdd6dfcdf5d621e4e4e05e42381bff78af7?apiKey=9109b7280ee1413784c03b4b33da37dc&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f9288037b4104014e1b8dda01d8b7fdd6dfcdf5d621e4e4e05e42381bff78af7?apiKey=9109b7280ee1413784c03b4b33da37dc&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f9288037b4104014e1b8dda01d8b7fdd6dfcdf5d621e4e4e05e42381bff78af7?apiKey=9109b7280ee1413784c03b4b33da37dc&"
              className="aspect-[1.41] w-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-semibold text-black">
              Contact Us
            </div>
            <div>N. Bacalso Avenue, Cebu City Philippines 6000</div>
            <div>+63 32 411 2000(trunkline)</div>
            <div>info@cit.edu</div>
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-semibold text-black">
              Quick Links
            </div>
            <div>Cit.edu</div>
            <div>Lair</div>
            <div>AIMS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
