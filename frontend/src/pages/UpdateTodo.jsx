import { Box, Button, Heading, Input, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { postTodo } from "../utils/postTodo";
import { getTodo } from "../utils/getTodo";
import updateTodo from "../utils/updateTodo";

export const UpdateTodo = () => {
  const [todo, setTodo] = useState({ task: "", status: true });
 const {id} = useParams()



  useEffect(() => {
    const fetching = async () => {
      const data = await getTodo(id);
      setTodo(data);
    };
    fetching();
  }, []);

  function handleInput(e) {
    const { value, name } = e.target;

    setTodo({
      ...todo,
      [name]: value == "Completed" ? true : value == "Pending" ? false : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(todo)
    updateTodo(todo)
  }

  return (
    <Box textAlign="center">
      <Box>
        <Link to="/">
          <Heading>Update Todo</Heading>
        </Link>
      </Box>
      <Box m="auto" mt="3rem" w="50%" border="1px solid gray" padding="3rem">
        <form onSubmit={handleSubmit}>
          <Box>
            <label>
              <Heading>Task Name:</Heading>
            </label>
            <Input
              name="task"
              mt="2rem"
              variant="filled"
              border="1px solid"
              placeholder="Enter Your Task Name"
              onChange={handleInput}
              value={todo.task}
            />
          </Box>
          <Box>
            <label>
              <Heading>Status:</Heading>
            </label>
            <Select
              name="status"
              mt="2rem"
              variant="filled"
              border="1px solid"
              onChange={handleInput}
              value={todo.status ? 'Completed' : 'Pending'}
            >
              <option>Completed</option>
              <option>Pending</option>
            </Select>
          </Box>
          <Box mt="4rem">
            <Button type="submit" border="1px solid">
            Update Task
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
