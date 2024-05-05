import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductApiService } from 'src/app/product-api.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
})
export class AddEditProductComponent implements OnInit {
  @Input() product: any;

  id: string = '';
  name: string = '';
  category: string = '';
  price!: number;
  description: string = '';
  productList$!: Observable<any[]>;

  constructor(private service: ProductApiService) {}

  ngOnInit(): void {
    (this.id = this.product.id),
      (this.name = this.product.name),
      (this.category = this.product.category),
      (this.price = this.product.price),
      (this.description = this.product.description),
      (this.productList$ = this.service.getProductList());
  }

  addProduct() {
    var product = {
      name: this.name,
      category: this.category,
      price: this.price,
      description: this.description,
    };

    this.service.addProduct(product).subscribe((res) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn?.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if (showAddSuccess) {
        showAddSuccess.style.display = 'block';
      }

      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    });
  }



  updateProduct() {
    var product = {
      id:this.id,
      name: this.name,
      category: this.category,
      price: this.price,
      description: this.description,
    };

    var id:string = this.id;
    this.service.updateProduct(product).subscribe((res) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn?.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = 'block';
      }

      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    });
  }
}
