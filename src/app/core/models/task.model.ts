export interface Task {
  id: number;
  name: string;
  status: string;
  assignedTo: string;
  priority: string;
  description: string;
  imageUrl: string;
  details: {
    createdDate: string;
    dueDate: string;
    notes: string;
  };
}