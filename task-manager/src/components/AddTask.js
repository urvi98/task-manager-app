import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  MenuItem,
  Select,
  Grid,
  InputLabel,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Modal,
  Typography,
  Button,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TaskStrings } from "../constants/strings";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,

  backgroundColor: "white",
  boxShadow: 24,
  padding: "20px",
};

const today = moment().format("YYYY-MM-DD");

export default function AddTask({ open, handleClose, addedTask, editTask }) {
  const [formData, setFormData] = useState({
    id: "",
    taskName: "",
    taskDescription: "",
    taskDueDate: "",
    taskStatus: "Pending",
    priority: "Low",
  });

  const [validationErrors, setValidationErrors] = useState({
    taskName: "",
    taskDescription: "",
    taskDueDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePriorityChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      priority: e.target.value,
    }));
  };

  const handleStatusChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      taskStatus: e.target.value,
    }));
  };

  const validateFields = () => {
    let isValid = true;
    const errors = {};

    if (formData.taskName.trim() === "") {
      errors.taskName = "Task name is required";
      isValid = false;
    }

    if (formData.taskDescription.trim() === "") {
      errors.taskDescription = "Task description is required";
      isValid = false;
    }

    if (formData.taskDueDate.trim() === "") {
      errors.taskDueDate = "Task due date is required";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleFormSubmit = () => {
    if (!validateFields()) {
      return;
    }

    addedTask(formData);
    handleClose();
  };

  useEffect(() => {
    if (Object.keys(editTask).length > 0) {
      const inputDate = editTask.taskDueDate;
      setFormData({
        id: editTask.id,
        taskName: editTask.taskName,
        taskDescription: editTask.taskDescription,
        taskDueDate: moment(inputDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
        taskStatus: editTask.taskStatus,
        priority: editTask.priority,
      });
    }
  }, [editTask]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ borderRadius: "16px", height: "600px" }}
    >
      <Box style={style}>
        <Typography variant="h5" component="h2">
          {Object.keys(editTask).length > 0 ? "Edit Task" : "Add Task"}
        </Typography>
        <TextField
          label="Task Name"
          value={formData.taskName}
          name="taskName"
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          error={!!validationErrors.taskName}
          helperText={validationErrors.taskName}
          sx={{ mt: 3 }}
        />
        <TextField
          label="Task Description"
          value={formData.taskDescription}
          name="taskDescription"
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          error={!!validationErrors.taskDescription}
          helperText={validationErrors.taskDescription}
        />
        <TextField
          type="date"
          label="Task Due Date"
          value={formData.taskDueDate}
          name="taskDueDate"
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: today,
          }}
          sx={{ mt: 3 }}
          required
          error={!!validationErrors.taskDueDate}
          helperText={validationErrors.taskDueDate}
        />
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Task status
        </Typography>
        <RadioGroup
          row
          value={formData.taskStatus}
          name="taskStatus"
          onChange={handleStatusChange}
          required
        >
          <FormControlLabel
            value="Completed"
            control={<Radio color="primary" />}
            label="Completed"
          />
          <FormControlLabel
            value="Pending"
            control={<Radio color="primary" />}
            label="Pending"
          />
        </RadioGroup>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel id="priority-filter-label">Priority</InputLabel>
          <Select
            labelId="priority-filter-label"
            label="Priority"
            id="priority-filter"
            value={formData.priority}
            onChange={handlePriorityChange}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
            sx={{
              display: "flex",
              justifyContent: "flex-end",

              borderRadius: "16px",
            }}
            endIcon={<CheckCircleIcon />}
          >
            <Typography sx={{ textTransform: "none" }}>{TaskStrings['confirm']}</Typography>
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}
