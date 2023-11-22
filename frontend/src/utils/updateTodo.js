import axios from "axios";

const baseURL = "http://127.0.0.1:8080/";

async function updateTodo(todo) {
  try {
    let res = await axios.patch(`${baseURL}/${todo.id}`, todo);

    return res.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    return error;
  }
}

export default updateTodo;
