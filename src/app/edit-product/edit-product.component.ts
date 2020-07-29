import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogueService } from '../services/catalogue.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public currentProduct:Product;
  url: string;
  constructor(private router:Router, private activatedRoute:ActivatedRoute,
    private catService:CatalogueService) { }

  ngOnInit(): void {
    this.url=atob(this.activatedRoute.snapshot.params.id);
    this.catService.getRecsource(this.url)
    .subscribe(data=>{
      this.currentProduct=data;
    },err=>{
      console.log(err);
    })
    }
  onUpdateProduct(value:any){
      this.catService.updateRecsource(this.url,value)
      .subscribe(data=>{
        alert("Mise a jour effectué avec succées");
        this.router.navigateByUrl("/products");
      },err=>{
        console.log(err);
      })
  }

}
