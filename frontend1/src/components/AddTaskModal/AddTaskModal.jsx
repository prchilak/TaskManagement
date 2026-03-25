import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createTask, updateTask } from '../../app/features/tasks/tasksSlice';
import { showToast } from '../../app/features/alerts/alertsSlice';
import { useEffect } from 'react';
import { MenuItem } from '@mui/material';
const AddTaskModal = ({ open, handleClose, editingTask }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'Pending',
  });

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
      });
    } else {
      setForm({ title: '', description: '' });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title) return;

    let res;

    if (editingTask) {
      res = await dispatch(updateTask({ id: editingTask._id, data: form }));
    } else {
      res = await dispatch(createTask(form));
    }

    if (res.meta.requestStatus === 'fulfilled') {
      dispatch(
        showToast({
          message: editingTask ? 'Task updated' : 'Task created',
          severity: 'success',
        }),
      );

      handleClose();
    } else {
      dispatch(
        showToast({
          message: res.payload,
          severity: 'error',
        }),
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle> {editingTask ? 'Edit Task' : 'Add Task'}</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label='Title'
          name='title'
          margin='normal'
          value={form.title}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label='Description'
          name='description'
          margin='normal'
          multiline
          rows={3}
          value={form.description}
          onChange={handleChange}
        />

        <TextField
          select
          fullWidth
          label='Status'
          name='status'
          margin='normal'
          value={form.status}
          onChange={handleChange}
        >
          <MenuItem value='Pending'>Pending</MenuItem>
          <MenuItem value='In Progress'>In Progress</MenuItem>
          <MenuItem value='Completed'>Completed</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant='contained' onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
