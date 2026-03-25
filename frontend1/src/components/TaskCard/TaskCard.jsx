import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'default';
    case 'In Progress':
      return 'warning';
    case 'Completed':
      return 'success';
    default:
      return 'default';
  }
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        height: 220,
        width: '100%',
        maxWidth: { sm: 120, md: 180, lg: 240, xl: 320 },
        minWidth: { sm: 120, md: 180, lg: 240, xl: 320 },
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
        }}
      >
        <Typography
          variant='h6'
          sx={{
            fontWeight: 600,
            mb: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {task.title}
        </Typography>
        <Box
          mt={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Chip
            label={task.status}
            size='small'
            color={getStatusColor(task.status)}
          />
          <Box>
            <IconButton size='small' onClick={() => onEdit(task)}>
              <EditIcon fontSize='small' />
            </IconButton>

            <IconButton size='small' onClick={() => onDelete(task._id)}>
              <DeleteIcon fontSize='small' />
            </IconButton>
          </Box>
        </Box>

        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {task.description || 'No description'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
