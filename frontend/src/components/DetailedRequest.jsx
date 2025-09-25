import api from "../api";
import { useState, useEffect } from "react";
export default function DetailedRequest(props) {
  const [data, setData] = useState([]);
  const url = `api/enquirylist/`;
  const context = {
    params: {
      request_id: props.data.id,
    },
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(url, context);
        const elements = res.data.map((el) => {
          return (
          <div key={el.id} className="flex">
<div>

</div>
<div>
    
</div>
          </div>
        );
        });
        setData(elements);
      } catch (err) {
      } finally {
      }
    }
    fetchData();
  }, []);

  return <div className=" m-5">{data}</div>;
}
