import { Routes } from '@angular/router';
import { MainComponent } from './componetMain/main/main.component';
import { FormComponent } from './componetForm/form/form.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'form', component: FormComponent }
];
