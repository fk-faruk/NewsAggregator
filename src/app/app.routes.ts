import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { Guard } from './services/guard';

export const routes: Routes = [
    {path: '', redirectTo: 'HomePage', pathMatch: 'full'},
    {path: 'HomePage', component: HomePageComponent },
    {path: 'favourite', component: FavoritesComponent , canActivate: [Guard]}
];
