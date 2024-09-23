import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationSelectionComponent } from '../components/location-selection/location-selection.component';
import { ResultsComponent } from '../components/results/results.component';
import { SimulationComponent } from '../components/simulation/simulation.component';

export const routes: Routes = [
  { path: '', component: LocationSelectionComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'simulation', component: SimulationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

