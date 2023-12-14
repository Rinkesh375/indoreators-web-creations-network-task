import { Box, Flex, Grid, Heading, Input,  Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const addTask = async () => {
        try {
          const res = await fetch(`${apiUrl}task`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
          })
          const data = await res.json()
          setTasks([data.task, ...tasks])
          setTask("")
        }
        catch (error) {
          console.log(error)
        }
      }
      addTask()
    }
  };
  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await fetch(`${apiUrl}task`)
        const data = await res.json()
       
        setTasks(data)
      }
      catch (error) {
        console.log(error)
      }
    }
    getTasks()
  }, [])

  const handleDelete = (item) => {
    const deleteTask = async () => {
      try {
        const res = await fetch(`${apiUrl}task/delete/${item._id}`, {
          method: 'DELETE'
        })
        await res.json()
        const filteredTask = tasks.filter((el) => el._id !== item._id)
        setTasks(filteredTask)
      }
      catch (error) {
        console.log(error)
      }
    }
    deleteTask()
  }

  return (

      <Box bgColor={"#f0f5f9"} minHeight={"100vh"} padding={"20px"} fontFamily={"Arial, sans-serif"}>
  <Flex bgColor={"#2c3e50"} color={"white"} p={"10px"} position={"fixed"} w={"100%"} alignItems={"center"}>
    <Flex alignItems={"center"} gap={"10px"}>
      <HiOutlineMenuAlt2 size={"20px"} />
      <Heading fontSize={"24px"}>Notes</Heading>
    </Flex>
  </Flex>

  <Box className="task" marginTop={"80px"}>
    <Flex justifyContent={"center"}>
      <Input
        placeholder="Take a note..."
        width={"100%"}
        height={"60px"}
        bgColor={"#ffffff"}
        fontSize={"16px"}
        padding={"10px"}
        borderRadius={"8px"}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Flex>
    <br />
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(5, 1fr)" }} gap={4} p="20px">
      {tasks?.map((item, index) => (
        <Box
          key={index}
          bgColor={"#ffffff"}
          p={"20px"}
          borderRadius={"10px"}
          boxShadow={"0 4px 8px rgba(0, 0, 0, 0.1)"}
        >
          <Text fontWeight={500} fontSize={"18px"} color={"#333333"}>
            {item.task.split(' ').slice(0, 2).join(' ')}
          </Text>
          <Text fontSize={"16px"} color={"#555555"}>{item.task}</Text>
          <Flex justifyContent={"space-between"} mt={"10px"} alignItems={"center"}>
            <Text fontSize={"12px"} color={"#777777"}>{item.createdAt}</Text>
            <Text cursor={"pointer"} onClick={() => handleDelete(item)} fontSize={"20px"} color={"#e74c3c"}>
              <MdDelete />
            </Text>
          </Flex>
        </Box>
      ))}
    </Grid>
  </Box>
</Box>

  )
}

export default App
