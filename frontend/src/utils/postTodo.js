const baseURL = "http://127.0.0.1:8080/";

export async function postTodo(todo) {
  let response = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  let data = await response.json();
  console.log(data);
  return data;
}
