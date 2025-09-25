import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ContentBar from "../components/ContentBar";
import NewRequest from "../components/NewRequest";
import Requests from "../components/Requests";
import { useState } from "react";
import api from "../api";
import ShopHome from "./shop/Home"

export default function Home() {

  const [userData, setUserData] = useState({})
  async function fetchData() {
      try {
        const url = "api/getuser/"
        const res = await api.get(url);
        setUserData(res.data);
        
        
      } catch (error) {
        
      }
    }
    if (localStorage.getItem("access")){
      fetchData();
    }
  

  const list = ["Create New", "Requests", "Previous Requests"];
  const [selected, setSelected] = useState(null);
  const listEl = list.map((el, i) => (
    <div
      key={i}
      className={`p-2 cursor-pointer text-center ${
        selected === i ? "selected-sidebar" : "hover:bg-emerald-200"
      }`}
      onClick={() => {
        setSelected(i);
      }}
    >
      {el}
    </div>
  ));
  let data = null;
  if (selected === 0) {
    data = <NewRequest />;
  } else if (selected === 1) {
    data = <Requests />;
  }

  return (
    {userData.role === "user"?(
      <main>
      <Header />
      <div className="flex">
        <div className="w-50">
          <SideBar list={listEl} />
        </div>
        <div className="w-full">
          {selected === null ? <DefaultDesign /> : <ContentBar data={data} />}
        </div>
      </div>
    </main>

    ): <ShopHome/>}
    
  );
}
function DefaultDesign() {
  return (
    <h1 className="mt-10 text-center">
      Here is the Home Page. Select left margin for more options
    </h1>
  );
}
