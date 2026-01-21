import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CategoryMasterComponent } from './category-master/category-master.component';
import { ProductMasterComponent } from './product-master/product-master.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
