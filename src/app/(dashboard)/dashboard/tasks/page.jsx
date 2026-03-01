// Comment out the problematic import
// import TasksContainer from '@/containers/dashboard/TasksContainer';
import TasksContainer from '@/containers/dashboard/TasksContainer';

export const metadata = {
  title: 'Tasks - Planwise | Student Planning App',
};

export default function TasksPage() {
  return <TasksContainer />;
}