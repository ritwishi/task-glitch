import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Priority, Status, Task } from '@/types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: Omit<Task, 'id'> & { id?: string }) => void;
  existingTitles: string[];
  initial?: Task | null;
}

const priorities: Priority[] = ['High', 'Medium', 'Low'];
const statuses: Status[] = ['Todo', 'In Progress', 'Done'];

export default function TaskForm({ open, onClose, onSubmit, existingTitles, initial }: Props) {
  const [title, setTitle] = useState('');
  const [revenue, setRevenue] = useState<string | number>('');
  const [timeTaken, setTimeTaken] = useState<string | number>('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setTitle(initial.title);
      setRevenue(initial.revenue);
      setTimeTaken(initial.timeTaken);
      setPriority(initial.priority);
      setStatus(initial.status);
      setNotes(initial.notes ?? '');
    } else {
      setTitle('');
      setRevenue('');
      setTimeTaken('');
      setPriority('');
      setStatus('');
      setNotes('');
    }
  }, [open, initial]);

  const duplicateTitle = useMemo(() => {
    const current = title.trim().toLowerCase();
    if (!current) return false;
    const others = initial
      ? existingTitles.filter(t => t.toLowerCase() !== initial.title.toLowerCase())
      : existingTitles;
    return others.map(t => t.toLowerCase()).includes(current);
  }, [title, existingTitles, initial]);

  // Add these variable declarations
  const revenueNum = typeof revenue === 'number' ? revenue : Number(revenue);
  const timeNum = typeof timeTaken === 'number' ? timeTaken : Number(timeTaken);



  const canSubmit =
    !!title.trim() &&
    !duplicateTitle &&
    !isNaN(revenueNum) &&
    revenueNum >= 0 &&
    !isNaN(timeNum) &&
    timeNum > 0 &&
    !!priority &&
    !!status;

  const handleSubmit = () => {
    const safeTime = timeNum > 0 ? timeNum : 1;

    const payload: Omit<Task, 'id'> & { id?: string } = {
      title: title.trim(),
      revenue: revenueNum || 0,
      timeTaken: safeTime,
      priority: (priority || 'Medium') as Priority,
      status: (status || 'Todo') as Status,
      notes: notes.trim() || undefined,
      createdAt: initial?.createdAt ?? new Date().toISOString(),
      completedAt: initial?.completedAt,
      ...(initial ? { id: initial.id } : {}),
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initial ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            error={!!title && duplicateTitle}
            helperText={duplicateTitle ? 'Duplicate title not allowed' : ' '}
            required
            autoFocus
            fullWidth
          />
          <TextField
            label="Revenue"
            type="number"
            value={revenue}
            onChange={e => setRevenue(e.target.value === '' ? '' : Number(e.target.value))}
            inputProps={{ min: 0, step: 1 }}
            required
            fullWidth
          />
          <TextField
            label="Time Taken (hours)"
            type="number"
            value={timeTaken}
            onChange={e => setTimeTaken(e.target.value === '' ? '' : Number(e.target.value))}
            inputProps={{ min: 1, step: 1 }}
            required
            fullWidth
          />
          <FormControl fullWidth required>
            <InputLabel>Priority</InputLabel>
            <Select value={priority} label="Priority" onChange={e => setPriority(e.target.value as Priority)}>
              {priorities.map(p => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Status</InputLabel>
            <Select value={status} label="Status" onChange={e => setStatus(e.target.value as Status)}>
              {statuses.map(s => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Notes" value={notes} onChange={e => setNotes(e.target.value)} multiline minRows={2} fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!canSubmit}>
          {initial ? 'Save Changes' : 'Add Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
