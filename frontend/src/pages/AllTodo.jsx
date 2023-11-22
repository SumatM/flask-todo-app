import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { getTodo } from "../utils/getTodo";
import { Link, useNavigate } from "react-router-dom";
import updateTodo from "../utils/updateTodo";
import { deleteTodo } from "../utils/deleteTodo";

export const AllTodo = () => {
  const [todo, setTodo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetching = async () => {
      const data = await getTodo();
      setTodo(data);
    };
    fetching();
  }, []);

  async function updateStatus({ task, index }) {
    console.log(task, index);
    try {
      await updateTodo({ ...task, status: !task.status });
      localUpdate({ task, index });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  function localUpdate({ task, index }) {
    let newTodo = todo.map((ele, ind) => {
      if (ind === index) {
        return { ...task, status: !task.status };
      } else {
        return ele;
      }
    });
    setTodo(newTodo);
  }

  async function handleDelete(id) {
    try {
      let data = await deleteTodo(id);
      console.log(data);
      let newTodo = todo.filter((ele) => {
        return ele.id !== id;
      });
      setTodo(newTodo);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Box textAlign="center">
      <Box>
        <Link to="/add">
          <Heading>Todos</Heading>
        </Link>
      </Box>
      <Box w="60%" m="auto" mt="3rem" border="1px solid black">
        <Table colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Task</Th>
              <Th>Status</Th>
              <Th>Toggle Status</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todo?.map((ele, ind) => {
              return (
                <Tr key={ind}>
                  <Td>{ele?.task}</Td>
                  <Td>{ele?.status ? "Completed" : "Pending"}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        updateStatus({ task: ele, index: ind });
                      }}
                    >
                      {!ele?.status ? "Completed" : "Pending"}
                    </Button>
                  </Td>
                  <Td>
                    <Button onClick={() => navigate(`/update/${ele.id}`)}>
                      Edit
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      onClick={() => {
                        handleDelete(ele.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
