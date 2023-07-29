import { useEffect, useState } from "react";
import { Date_Time } from "../components/Time/Date_Time";
import Auth from "../utils/auth";

const EnterTime = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const userToken = Auth.getToken();
    setToken(userToken);
    if (!userToken) {
      window.location.assign("/login");
    }
    console.log(token);
  }, []);
  return <div>{token ? <Date_Time token={token} /> : false}</div>;
};

export default EnterTime;