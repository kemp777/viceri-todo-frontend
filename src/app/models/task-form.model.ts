import { FormControl } from '@angular/forms';

export interface TaskForm {
  description: FormControl<string>;
  priority: FormControl<'Alta' | 'Média' | 'Baixa' | 'Selecionar'>;
}
