import axios from "axios";
const baseURL = "http://127.0.0.1:8080/";

export async function getTodo(id) {
  console.log(id);
  try {
    let res = null;
    if (id) {
       res = await fetch(`${baseURL}todo/${id}`);
    } else {
       res = await fetch(baseURL);
    }
    let data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}
