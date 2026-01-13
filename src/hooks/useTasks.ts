import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DerivedTask, Metrics, Task } from '@/types';
import {
  computeAverageROI,
  computePerformanceGrade,
  computeRevenuePerHour,
  computeTimeEfficiency,
  computeTotalRevenue,
  withDerived,
  sortTasks as sortDerived,
} from '@/utils/logic';
import { generateSalesTasks } from '@/utils/seed';

interface UseTasksState {
  tasks: DerivedTask[];
<<<<<<< HEAD
  derivedSorted: DerivedTask[];
=======
  derivedSorted: DerivedTask[]; 
>>>>>>> de8aee1 (Fix: Resolve final)
  loading: boolean;
  error: string | null;
  metrics: Metrics;
  lastDeleted: Task | null;
  addTask: (task: Omit<Task, 'id' | 'createdAt'> & { id?: string }) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  undoDelete: () => void;
}

const INITIAL_METRICS: Metrics = {
  totalRevenue: 0,
  totalTimeTaken: 0,
  timeEfficiencyPct: 0,
  revenuePerHour: 0,
  averageROI: 0,
  performanceGrade: 'Needs Improvement',
};

export function useTasks(): UseTasksState {
  const [tasks, setTasks] = useState<DerivedTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDeleted, setLastDeleted] = useState<Task | null>(null);
  const fetchedRef = useRef(false);

  function normalizeTasks(input: any[]): DerivedTask[] {
    const now = Date.now();
    return (Array.isArray(input) ? input : []).map((t, idx) => {
      const created = t.createdAt
        ? new Date(t.createdAt)
        : new Date(now - (idx + 1) * 24 * 3600 * 1000);

      const completed =
        t.completedAt ||
        (t.status === 'Done'
          ? new Date(created.getTime() + 24 * 3600 * 1000).toISOString()
          : undefined);

      const baseTask: Task = {
        id: t.id,
        title: t.title,
        revenue: Number(t.revenue) ?? 0,
        timeTaken: Number(t.timeTaken) > 0 ? Number(t.timeTaken) : 1,
        priority: t.priority,
        status: t.status,
        notes: t.notes,
        createdAt: created.toISOString(),
        completedAt: completed,
      };

      return withDerived(baseTask);
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const res = await fetch('/tasks.json');
        if (!res.ok) throw new Error(`Failed to load tasks.json (${res.status})`);
        const data = (await res.json()) as any[];

        const normalized = normalizeTasks(data);
        const finalData =
          normalized.length > 0
            ? normalized
            : normalizeTasks(generateSalesTasks(50));

        if (isMounted) setTasks(sortDerived(finalData));
      } catch (e: any) {
        if (isMounted) setError(e?.message ?? 'Failed to load tasks');
      } finally {
        if (isMounted) {
          setLoading(false);
          fetchedRef.current = true;
        }
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  //  stable sorted view for UI
  const derivedSorted = useMemo(() => {
    return sortDerived(tasks);
  }, [tasks]);

  const metrics = useMemo(() => {
    if (tasks.length === 0) return INITIAL_METRICS;

    const totalRevenue = computeTotalRevenue(tasks);
    const totalTimeTaken = tasks.reduce((s, t) => s + t.timeTaken, 0);
    const timeEfficiencyPct = computeTimeEfficiency(tasks);
    const revenuePerHour = computeRevenuePerHour(tasks);
    const averageROI = computeAverageROI(tasks);
    const performanceGrade = computePerformanceGrade(averageROI);

    return {
      totalRevenue,
      totalTimeTaken,
      timeEfficiencyPct,
      revenuePerHour,
      averageROI,
      performanceGrade,
    };
  }, [tasks]);

  const derivedSorted = useMemo(() => sortDerived(tasks), [tasks]);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'> & { id?: string }) => {
    setTasks(prev => {
      const id = task.id ?? crypto.randomUUID();
      const timeTaken = task.timeTaken <= 0 ? 1 : task.timeTaken;
      const createdAt = new Date().toISOString();
      const completedAt = task.status === 'Done' ? createdAt : undefined;

      const newTask: Task = {
        ...task,
        id,
        timeTaken,
        createdAt,
        completedAt,
      };

      return sortDerived([...prev, withDerived(newTask)]);
    });
  }, []);

  const updateTask = useCallback((id: string, patch: Partial<Task>) => {
    setTasks(prev =>
      sortDerived(
        prev.map(t => {
          if (t.id !== id) return t;

          const baseTask: Task = { ...t, ...patch } as Task;

          if (t.status !== 'Done' && baseTask.status === 'Done' && !baseTask.completedAt) {
            baseTask.completedAt = new Date().toISOString();
          }

          if ((patch.timeTaken ?? t.timeTaken) <= 0) {
            baseTask.timeTaken = 1;
          }

          return withDerived(baseTask);
        })
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => {
      const target = prev.find(t => t.id === id);
      if (target) {
        setLastDeleted({
          id: target.id,
          title: target.title,
          revenue: target.revenue,
          timeTaken: target.timeTaken,
          priority: target.priority,
          status: target.status,
          notes: target.notes,
          createdAt: target.createdAt,
          completedAt: target.completedAt,
        });
      }
      return prev.filter(t => t.id !== id);
    });
  }, []);

  const undoDelete = useCallback(() => {
    if (!lastDeleted) return;
    setTasks(prev => sortDerived([...prev, withDerived(lastDeleted)]));
    setLastDeleted(null);
  }, [lastDeleted]);

<<<<<<< HEAD
  return { tasks, derivedSorted, loading, error, metrics, lastDeleted, addTask, updateTask, deleteTask, undoDelete };
=======
  return {
    tasks,
    derivedSorted, 
    loading,
    error,
    metrics,
    lastDeleted,
    addTask,
    updateTask,
    deleteTask,
    undoDelete,
  };
>>>>>>> de8aee1 (Fix: Resolve final)
}
