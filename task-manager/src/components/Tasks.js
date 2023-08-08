import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Box,
  TableRow,
  TableCell,
  IconButton,
  Chip,
  Checkbox,
  Tooltip,
  InputLabel,
} from "@mui/material";
import moment from "moment";
import TaskTable from "./TaskTable";
import AddTask from "./AddTask";
import mockData from "../resources/tasks.json";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TaskStrings } from "../constants/strings";

export default function Tasks() {
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : mockData
  );
  const [open, setOpen] = useState(false);
  const [filterOption, setFilterOption] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [editTask, setEditTask] = useState({});

  const addTask = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditTask({});
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const sortDueDate = () => {
    const sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => {
      const dateA = moment(a.taskDueDate, "DD/MM/YYYY");
      const dateB = moment(b.taskDueDate, "DD/MM/YYYY");
      return dateA.diff(dateB);
    });

    setTasks(sortedTasks);
  };

  const handleDoneClick = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            taskStatus:
              task.taskStatus === "Completed" ? "Pending" : "Completed",
          };
        }
        return task;
      })
    );
  };

  const renderTasks = (filteredData) => {
    const data = filteredData || tasks;
    const mapRow = data.map((task, index) => (
      <TableRow
        key={task.id}
        sx={{
          backgroundColor: index % 2 !== 0 ? "#f5f5f5" : "white",
        }}
      >
        <TableCell>{task.taskName}</TableCell>
        <TableCell>
          <Chip
            label={task.priority}
            sx={{
              backgroundColor:
                task.priority === "High"
                  ? "#ffddcc"
                  : task.priority === "Medium"
                  ? "#f0e5b2"
                  : task.priority === "Low"
                  ? "#cce5ff"
                  : "inherit",
              color:
                task.priority === "High"
                  ? "#ff6f00"
                  : task.priority === "Medium"
                  ? "#b48a00"
                  : task.priority === "Low"
                  ? "#0052cc"
                  : "inherit",
            }}
          />
        </TableCell>
        <TableCell>{task.taskDescription}</TableCell>
        <TableCell>{task.taskDueDate}</TableCell>
        <TableCell sx={{ width: "0.5%" }}>
          <Tooltip
            title={
              task.taskStatus === "Completed"
                ? "Mark as pending"
                : "Mark as completed"
            }
            arrow
            placement="top"
          >
            <Checkbox
              checked={task.taskStatus === "Completed"}
              onChange={() => handleDoneClick(task.id)}
              color="success"
            />
          </Tooltip>
        </TableCell>
        <TableCell>
          {task.taskStatus === "Completed" ? (
            <Chip
              label="Completed"
              sx={{ backgroundColor: "#54D62C29", color: "#229A16" }}
            />
          ) : (
            <Chip
              label="Pending"
              sx={{ backgroundColor: "#feedcf", color: "#e79f31" }}
            />
          )}
        </TableCell>

        <TableCell>
          <Tooltip title={"Edit Task"} arrow placement="top">
            <IconButton
              onClick={() => {
                setEditTask(task);
                setOpen(true);
              }}
            >
              {<EditIcon color="primary" />}
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>
          <Tooltip title={"Delete Task"} arrow placement="top">
            <IconButton onClick={() => handleDeleteTask(task.id)}>
              {<DeleteIcon color="error" />}
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));

    return data?.length > 0 ? (
      mapRow
    ) : (
      <Container>
        <TableRow>
          <Box
            sx={{
              textAlign: "center",
              minHeight: "160px",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ textAlign: "center" }}>
              {TaskStrings["noDataText"]}
            </Typography>
          </Box>
        </TableRow>
      </Container>
    );
  };

  const addedTask = (taskData) => {
    const formattedTaskData = {
      ...taskData,
      id: taskData.id || Math.floor(Math.random() * 100000),
      taskDueDate: moment(taskData.taskDueDate).format("DD/MM/YYYY"),
    };

    const index = tasks.findIndex((item) => item.id === formattedTaskData.id);

    if (index !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = formattedTaskData;
      setTasks(updatedTasks);
    } else {
      setTasks((prevTasks) => [...prevTasks, formattedTaskData]);
    }
  };

  const filterTasks = () => {
    let filteredTasks = tasks;

    if (filterOption === "Completed") {
      filteredTasks = filteredTasks.filter(
        (task) => task.taskStatus === "Completed"
      );
    } else if (filterOption === "Pending") {
      filteredTasks = filteredTasks.filter(
        (task) => task.taskStatus === "Pending"
      );
    }

    if (priorityFilter !== "All") {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === priorityFilter
      );
    }

    return filteredTasks;
  };

  useEffect(() => {
    sortDueDate();
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <Container sx={{ pb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            pb: 3,
          }}
        >
          <Box sx={{ display: "flex", gap: "16px" }}>
            <FormControl sx={{ borderRadius: "16px", minWidth: "140px" }}>
              <InputLabel id="status-filter-label">Filter by status</InputLabel>
              <Select
                labelId="status-filter-label"
                label="Filter by status"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                sx={{ borderRadius: "16px" }}
              >
                <MenuItem value="All">View All</MenuItem>
                <MenuItem value="Completed">View Completed</MenuItem>
                <MenuItem value="Pending">View Pending</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ borderRadius: "16px", minWidth: "160px" }}>
              <InputLabel id="priority-filter-label">
                Filter by priority
              </InputLabel>
              <Select
                labelId="priority-filter-label"
                label="Filter by priority"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                sx={{ borderRadius: "16px" }}
              >
                <MenuItem value="All">All Priorities</MenuItem>
                <MenuItem value="High">High Priority</MenuItem>
                <MenuItem value="Medium">Medium Priority</MenuItem>
                <MenuItem value="Low">Low Priority</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={addTask}
              sx={{
                borderRadius: "16px",
                backgroundColor: "#88CDF6",
                "&:hover": {
                  backgroundColor: "#70B8E2",
                },
              }}
              startIcon={<AddCircleIcon sx={{ color: "black" }} />}
            >
              <Typography
                variant="button"
                sx={{ textTransform: "none", color: "black", fontWeight: 550 }}
              >
                {TaskStrings["addTask"]}
              </Typography>
            </Button>
          </Box>
        </Box>

        {tasks?.length > 0 ? (
          <TaskTable tasks={filterTasks()} renderTaskData={renderTasks} />
        ) : (
          <Typography variant="body1">
            {TaskStrings["addTaskToGetStarted"]}
          </Typography>
        )}
      </Container>

      {open && (
        <AddTask
          open={open}
          handleClose={handleClose}
          addedTask={addedTask}
          editTask={editTask}
        />
      )}
    </>
  );
}
