import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-product-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {

  products: any[] = [];
  categories: any[] = [];

  productName = '';
  categoryId: number = 0;
  editId: number | null = null;

  page = 1;
  pageSize = 10;

productApi = `${environment.apiBaseUrl}/api/products`;
categoryApi = `${environment.apiBaseUrl}/api/categories`;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private toast: ToastService) { }

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.http.get<any[]>(this.categoryApi)
      .subscribe({
        next: (res) => {
          this.categories = res;
        },
         error: (err) => {
          this.toast.error(err?.error?.message || 'Failed to load categories');
        }
      });
  }


  loadProducts() {
    this.http.get<any[]>(
      `${this.productApi}?page=${this.page}&pageSize=${this.pageSize}`
    ).subscribe({
      next: (res) => {
        this.products = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
          this.toast.error(err?.error?.message || 'Failed to load products');
        }
    });
  }


  saveProduct() {
    if (!this.productName || this.categoryId === 0) {
      this.toast.error('Product name and category are required');
      return;
    }

    const body = {
      ProductName: this.productName,
      CategoryId: this.categoryId
    };

    if (this.editId !== null) {
      this.http.put(`${this.productApi}/${this.editId}`, body)
        .subscribe({
          next: () => {
            this.toast.success('Product updated successfully');
            this.reset();
            this.loadProducts();
          },
          error: (err) => {
            this.toast.error(err?.error?.message || 'Update failed');
          }
        });
    } else {
      this.http.post(this.productApi, body)
        .subscribe({
          next: () => {
            this.toast.success('Product added successfully');
            this.reset();
            this.page = 1;
            this.loadProducts();
          },
          error: (err) => {
            this.toast.error(err?.error?.message || 'Add failed');
          }
        });
    }
  }




  edit(p: any) {
    this.editId = p.ProductId;
    this.productName = p.ProductName;
    this.categoryId = p.CategoryId;
  }

  delete(id: number) {
    if (!confirm('Delete this product?')) return;

    this.http.delete(`${this.productApi}/${id}`)
      .subscribe({
        next: () => {
          this.toast.success('Product deleted successfully');
          this.loadProducts();
        },
        error: (err) => {
          this.toast.error(err?.error?.message || 'Delete failed');
        }
      });
  }


  next() {
    this.page++;
    this.loadProducts();
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }

  reset() {
    this.productName = '';
    this.categoryId = 0;
    this.editId = null;
  }
}
