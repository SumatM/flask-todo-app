const baseURL = "http://127.0.0.1:8080/";

export async function deleteTodo(id) {
  let req = await fetch(`${baseURL}/${id}`, {
    method: "DELETE",
    "content-type": "application/json",
  });
  let res = await req.json();
  console.log(res);
  return res;
}
