export interface Task {
  id: string;
  description: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  completed?: boolean;
}
