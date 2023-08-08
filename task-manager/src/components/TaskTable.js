import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Card,
} from "@mui/material";

const style = {
  fontWeight: 550,
};

const TaskTable = ({ tasks, renderTaskData }) => {
  return (
    <Card sx={{ borderRadius: "16px" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#88CDF6" }}>
              <TableCell sx={style}>Task Name</TableCell>
              <TableCell sx={style}>Priority</TableCell>
              <TableCell sx={style}>Task Description</TableCell>
              <TableCell sx={style}>Due Date</TableCell>
              <TableCell sx={{ width: "0.5%" }}></TableCell>
              <TableCell sx={style}>Status</TableCell>

              <TableCell sx={{ width: "1%" }}> </TableCell>
              <TableCell sx={{ width: "1%" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTaskData(tasks)}</TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default TaskTable;
