import api from "../api";
import DetailedRequest from "./DetailedRequest";
import { useEffect, useState } from "react";

export default function Requests() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const url = "/api/enquiry/";

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(url);
        setData(res.data);
      } catch (err) {
        console.error("API fetch error:", err);
      }
    }
    fetchData();
  }, []);

  const dataEl = data
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map((item, i) => {
      const date = new Date(item.created_at);
      const formattedDate = date.toLocaleString("en-IN", {
        dateStyle: "medium", // 14 Aug 2025
        timeStyle: "short", // 10:41 PM
      });
      return (
        <div
          onClick={() => {
            setSelected(item);
          }}
          key={i}
          className="shadow bg-blue-100 rounded p-2 hover:cursor-pointer"
        >
          <h3 className="text-md font-bold">{item.subject}</h3>
          <p>{item.message}</p>
          <p className="text-right text-xs">{formattedDate}</p>
        </div>
      );
    });

  return selected != null ? (
    <div>
      <div className="cursor-pointer" onClick={() => setSelected(null)}>
        <small>← Back to Requests</small>
      </div>
      <DetailedRequest data={selected} />
    </div>
  ) : (
    <div className="grid grid-cols-4 gap-2 ml-3 mr-3 mt-3">{dataEl}</div>
  );
}
