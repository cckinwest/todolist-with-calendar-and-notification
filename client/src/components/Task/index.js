import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Task = ({ taskId, title, description }) => {
  const [formData, setFormData] = useState({
    tasktitle: title,
    taskdescription: description,
  });

  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleDelete = () => {
    const taskData = { taskId: taskId };
    console.log(taskData);

    axios
      .put("http://localhost:3001/todo/delete", taskData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return edit ? (
    <form>
      <label htmlFor="tasktitle">Title: </label>
      <input
        name="tasktitle"
        id="tasktitle"
        value={formData.tasktitle}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="taskdescription">Description: </label>
      <input
        name="taskdescription"
        id="taskdescription"
        value={formData.taskdescription}
        onChange={handleChange}
      />
      <br />
      <button type="submit" onClick={handleEdit}>
        Save
      </button>
      <button onClick={handleDelete}>Delete</button>
    </form>
  ) : (
    <div style={{ backgroundColor: "yellow", marginBottom: "5px" }}>
      <h4>Title: {formData.tasktitle}</h4>
      <p>Description: {formData.taskdescription}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Task;
