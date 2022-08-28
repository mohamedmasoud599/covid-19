import axios from "axios";
import { load } from "../lib/local-storage";

class connect {
  BASE_URL = `http://${window.location.hostname}:3001/`;

  AXIOS_OPTION = (method, url, data = null, processData = true) => ({
    method: method,
    url: url,
    baseURL: this.BASE_URL,
    data: data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": load("token"),
    },
    processData: processData,
  });

  postData = (data, url, processData) =>
    axios(this.AXIOS_OPTION("POST", url, data, processData));

  getData = (data = null, url, processData) =>
    axios(this.AXIOS_OPTION("get", url, data, processData));

  putData = (data, url, processData) =>
    axios(this.AXIOS_OPTION("put", url, data, processData));

  patchData = (data, url, processData) =>
    axios(this.AXIOS_OPTION("patch", url, data, processData));

  deleteData = (data, url, processData) =>
    axios(this.AXIOS_OPTION("delete", url, data, processData));
}

export default connect;
