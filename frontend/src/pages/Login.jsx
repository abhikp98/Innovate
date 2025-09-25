import { Fragment, useState, useEffect } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [btn, setBtn] = useState("Get Otp");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [phone, setPhone] = useState(null);
  const navigate = useNavigate();

  if (localStorage.getItem(ACCESS_TOKEN)) {
    navigate("/");
  }

  const handleButtonClick = async (formData) => {
    setBtn("...");
    setIsDisabled(true);

    if (formData.get("method") === "login") {
      const url = "api/auth/request-otp/";
      const phone = formData.get("phone");
      setPhone(phone);
      try {
        const res = await api.post(url, { phone });
        res.status == "200" ? setIsVisible(!isVisible) : null;
      } catch (error) {
        console.log(error);
        navigate("login/");
      } finally {
        setBtn("Verify Otp");
        setIsDisabled(false);
      }
    } else {
      console.log("came here");
      const url = "api/auth/verify-otp/";
      const otp = formData.get("otp");
      try {
        const res = await api.post(url, { phone, otp });
        console.log(res.status);
        if (res.status == "200") {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

          setPhone(null);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };
  return (
    <Fragment>
      {isVisible && (
        <div className="flex justify-center items-center h-screen bg-gray-200">
          <div className="p-3 bg-white shadow-lg rounded-lg w-1/3">
            <h2 className="text-2xl mb-10 ml-2">Login</h2>
            <form
              action={handleButtonClick}
              className="flex justify-center mb-10 gap-2"
            >
              <input value="+91" className="w-9 text-xl" disabled />
              <input
                placeholder="Phone Number"
                maxLength="10"
                name="phone"
                required
                className="h-10 w-1/2 focus:outline focus:outline-amber-300 rounded pl-2 pr-2 text-xl"
              />
              <button
                disabled={isDisabled}
                name="method"
                value="login"
                className="w-1/2 bg-amber-300 text-white font-bold from-orange-100 cursor-pointer rounded shadow-2xs disabled:bg-amber-200"
              >
                {btn}
              </button>
            </form>
          </div>
        </div>
      )}

      {!isVisible && (
        <div className="flex justify-center items-center h-screen bg-gray-200">
          <div className="p-3 bg-white shadow-lg rounded-lg w-1/3">
            <h2 className="text-2xl mb-10 ml-2">Verify otp</h2>
            <form
              action={handleButtonClick}
              className="flex justify-center mb-10 gap-2"
            >
              <input
                placeholder="Otp"
                maxLength="6"
                required
                name="otp"
                className="h-10 w-1/2 focus:outline focus:outline-amber-300 rounded pl-2 pr-2 text-xl"
              />
              <button
                disabled={isDisabled}
                name="method"
                value="verify"
                className="w-1/2 bg-amber-300 text-white font-bold from-orange-100 cursor-pointer rounded shadow-2xs disabled:bg-amber-200"
              >
                {btn}
              </button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
}
