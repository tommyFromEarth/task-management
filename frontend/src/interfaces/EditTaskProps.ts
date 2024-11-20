export interface EditTaskProps {
  taskId: number;
  currentTitle: string;
  currentDescription: string;
  currentStatus: boolean;
  onClose: () => void;
}