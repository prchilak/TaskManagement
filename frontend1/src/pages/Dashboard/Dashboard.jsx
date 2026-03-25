import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import {
  deleteTask,
  fetchTasks,
  resetTasks,
} from '../../app/features/tasks/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import AddTaskModal from '../../components/AddTaskModal/AddTaskModal';
import TaskCard from '../../components/TaskCard/TaskCard';
import { showToast } from '../../app/features/alerts/alertsSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, hasMore, page } = useSelector((state) => state.tasks);

  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const handleDelete = async (id) => {
    const confirm = window.confirm('Delete this task?');
    if (!confirm) return;

    const res = await dispatch(deleteTask(id));

    if (res.meta.requestStatus === 'fulfilled') {
      dispatch(
        showToast({
          message: 'Task deleted',
          severity: 'success',
        }),
      );
    } else {
      dispatch(
        showToast({
          message: res.payload,
          severity: 'error',
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(resetTasks());

    dispatch(
      fetchTasks({
        page: 1,
        search: debouncedSearch,
        status: statusFilter,
      }),
    );
  }, [debouncedSearch, statusFilter, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    const isNearBottom = scrollHeight - scrollTop <= clientHeight + 50;

    if (isNearBottom && hasMore && !loading) {
      dispatch(
        fetchTasks({
          page: page + 1,
          search: debouncedSearch,
          status: statusFilter,
        }),
      );
    }
  };

  return (
    <Box p={3}>
      <Box display='flex' justifyContent='space-between' mb={2}>
        <Typography variant='h5'>Tasks Dashboard</Typography>
        <Box display='flex' gap={2}>
          <TextField
            label='Search'
            size='small'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TextField
            select
            label='Filter'
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{
              '& .MuiSelect-select': {
                padding: '8.5px 14px',
              },
            }}
          >
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='Pending'>Pending</MenuItem>
            <MenuItem value='In Progress'>In Progress</MenuItem>
            <MenuItem value='Completed'>Completed</MenuItem>
          </TextField>
        </Box>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setOpenCreateTaskModal(true)}
        >
          Add Task
        </Button>
      </Box>

      <Paper
        sx={{
          p: 2,
          maxHeight: { sm: '60vh', lg: '60vh', xl: '60vh' },
          overflowY: 'auto',
        }}
        onScroll={handleScroll}
      >
        <Grid container spacing={2} columns={12}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
              <TaskCard
                task={task}
                onEdit={(task) => {
                  setEditingTask(task);
                  setOpenCreateTaskModal(true);
                }}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
        {!loading && tasks.length === 0 && (
          <Box textAlign='center' mt={2}>
            No Tasks Added
          </Box>
        )}
      </Paper>
      {loading && (
        <Box textAlign='center' mt={2}>
          <CircularProgress size={24} />
        </Box>
      )}

      <AddTaskModal
        open={openCreateTaskModal}
        handleClose={() => {
          setOpenCreateTaskModal(false);
          setEditingTask(null);
        }}
        editingTask={editingTask}
      />
    </Box>
  );
};

export default Dashboard;
