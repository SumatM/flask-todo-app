import { Box, Button, Heading, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postTodo } from "../utils/postTodo";

export const AddTodo = () => {
  const [todo, setTodo] = useState({ task: "", status: true });

  function handleInput(e) {
    const { value, name } = e.target;

    setTodo({
      ...todo,
      [name]: value == "Completed" ? true : value == "Pending" ? false : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    postTodo(todo);
  }

  return (
    <Box textAlign="center">
      <Box>
        <Link to="/">
          <Heading>Add Todo</Heading>
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
            >
              <option>Completed</option>
              <option>Pending</option>
            </Select>
          </Box>
          <Box mt="4rem">
            <Button type="submit" border="1px solid">
              Add Task
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
