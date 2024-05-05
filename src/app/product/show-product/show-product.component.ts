import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductApiService } from 'src/app/product-api.service';
@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css'],
})
export class ShowProductComponent implements OnInit {
  productList$!: Observable<any[]>;

  // Map to display data associate with foreign keys
  productMap: Map<number, string> = new Map();

  constructor(private service: ProductApiService) {}

  ngOnInit(): void {
    this.productList$ = this.service.getProductList();
  }

  // Variables (properties)
  modalTitle: string = '';
  activateAddEditProductComponent: boolean = false;
  pagination: boolean = true;

  product: any;

  modalAdd() {
    this.product = {
      id: null,
      name: null,
      category: null,
      price: 0,
      description: null,
    };
    this.modalTitle = 'Add Product';
    this.activateAddEditProductComponent = true;
  }

  modalClose() {
    this.activateAddEditProductComponent = false;
    this.productList$ = this.service.getProductList();
  }

  modalEdit(item: any) {
    console.log(item);

    this.product = item;
    this.modalTitle = 'Edit Product';
    this.activateAddEditProductComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete inspection ${item.id}`)) {
      this.service.deleteProduct(item.id).subscribe((res) => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }

        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = 'block';
        }
        setTimeout(function () {
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = 'none';
          }
        }, 4000);
        this.productList$ = this.service.getProductList();
      });
    }
  }
}
