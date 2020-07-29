import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public currentProduct: Product;
  public mode:number=1;

  constructor(private catService:CatalogueService, private router:Router) { }

  ngOnInit(): void {
  }
  onSaveProduct(value:any){
    //console.log(value);
    this.catService.saveRecsource(this.catService.host + "/produits",  value )
    .subscribe(res=>{
      //console.log(res);
      //this.router.navigateByUrl("/products");
      this.currentProduct=res;
      this.mode=2;
    },err=>{
      console.log(err);
    })
  }
  onNewProduct(){
    this.mode=1;
  }

}
