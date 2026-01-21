import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-category-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-master.component.html',
  styleUrls: ['./category-master.component.css']
})
export class CategoryMasterComponent implements OnInit {

  categories: any[] = [];
  categoryName = '';
  editId: number | null = null;

  api = `${environment.apiBaseUrl}/api/categories`;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get<any[]>(this.api)
      .subscribe({
        next: (res) => {
          this.categories = res;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.toast.error(err?.error?.message || 'Failed to load categories');
        }
      });
  }

  saveCategory() {
    if (!this.categoryName.trim()) {
      this.toast.error('Category name is required');
      return;
    }

    const body = {
      CategoryName: this.categoryName
    };

    if (this.editId !== null) {
      this.http.put<any>(`${this.api}/${this.editId}`, body)
        .subscribe({
          next: () => {
            this.toast.success('Category updated successfully');
            this.reset();
            this.loadCategories();
          },
          error: (err) => {
            this.toast.error(err?.error?.message || 'Failed to update category');
          }
        });

    } else {
      this.http.post<any>(this.api, body)
        .subscribe({
          next: () => {
            this.toast.success('Category added successfully');
            this.reset();
            this.loadCategories();
          },
          error: (err) => {
            this.toast.error(err?.error?.message || 'Failed to add category');
          }
        });
    }
  }

  edit(cat: any) {
    this.editId = cat.categoryId;   
    this.categoryName = cat.categoryName;
  }

  delete(id: number) {
    if (!confirm('Delete this category?')) return;

    this.http.delete<any>(`${this.api}/${id}`)
      .subscribe({
        next: () => {
          this.toast.success('Category deleted successfully');
          this.loadCategories();
        },
        error: (err) => {
          this.toast.error(err?.error?.message || 'Failed to delete category');
        }
      });
  }

  reset() {
    this.categoryName = '';
    this.editId = null;
  }
}
