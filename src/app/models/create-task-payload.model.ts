export interface CreateTaskPayload {
  description: string;
  priority: 'Alta' | 'Média' | 'Baixa';
}
