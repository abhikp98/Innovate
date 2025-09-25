import { Fragment } from "react";
import api from "../api";
import { useState } from "react";

export default function NewRequest() {
  const [success, setSuccess] = useState(false);

  if (success) {
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  }

  function handleButtonClick(formData) {
    const context = {
      message: formData.get("message"),
      subject: formData.get("subject"),
    };
    const url = "api/enquiry/";
    const res = api.post(url, context);
    try {
      console.log(res.status);
    } catch (error) {
      console.log(error);
    } finally {
      setSuccess(true);
    }
  }

  return (
    <form
      className="bg-emerald-200 mt-5 ml-10 mr-10 p-3 rounded-xl"
      action={handleButtonClick}
    >
      <div className="flex flex-col w-1/3 mx-auto gap-4">
        {success && <SuccessMessage />}
        <input
          type="text"
          required
          placeholder="What do you really want?"
          name="subject"
          className="focus:outline-1 outline-emerald-700 border border-emerald-700 text-emerald-800 rounded"
        />
        <textarea
          placeholder="Describe the product"
          name="message"
          required
          className="focus:outline-1 outline-emerald-700 border border-emerald-700 text-emerald-800 rounded"
        ></textarea>
        {/* <input type="file" className="bg-blue-200 rounded" /> */}
        <button className="bg-emerald-700 text-white rounded-xl pt-1 pb-1 mt-5">
          Enquire!
        </button>
      </div>
    </form>
  );
}
function SuccessMessage() {
  return (
    <div className="bg-emerald-500 text-white">
      <h1 className="text-center p-1">Sussessfully Requested :)</h1>
    </div>
  );
}
