import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../helpers/constants";

const FormContainer = ({ updateReloadState }) => {
  const [fullUrl, setFullUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${serverUrl}/shortUrl`, { fullUrl: fullUrl });
      setFullUrl("");
      updateReloadState();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto p-2">
      <div className="bg-banner my-8 rounded-xl bg-cover">
        <div className="w-full h-full rounded-xl p-20 backdrop-brightness-50">
          <h2 className="text-white text-center text-4xl pb-4">
            ShrinkIt
          </h2>

          <p className="text-white text-center text-2xl pb-5">
            Paste untidy link to shorten
          </p>
          {/* <p className="text-white text-center text-sm pb-4 font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum atque
            eos molestias quidem itaque{" "}
          </p> */}

          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="w-full realtive inputContainer flex gap-2">
                <div className="flex items-center text-white pointer-events-none">
                  ShrinkIt.links/
                </div>

                <div className="flex flex-1 gap-2">
                  <input
                    type="text"
                    placeholder="add the URL : "
                    required
                    value={fullUrl}
                    onChange={(e) => setFullUrl(e.target.value)}
                    className="block w-full p-2 roundex-lg border border-grey-300 bg-white focus:ring-blue-700 focus: border-blue-700 rounded-xl"
                  />

                  <button
                    type="submit"
                    className="p-2.5 text-sm font-medium  text-white bg-blue-700 rounded-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Shorten
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
