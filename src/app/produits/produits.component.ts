import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  public produits:any;
  public page:number=0;
  public size:number=5;
  public totalPages: number;
  public pages:Array<number>;
  public currentKeyword: string="";
  constructor(private catService:CatalogueService,private router:Router) { }

  ngOnInit(): void {
  }
  onGetProducts(){
    this.page=0;
    this.currentKeyword="";
this.catService.getProducts(this.page,this.size)    
.subscribe(data=>{
  this.totalPages=data["page"].totalPages;
  this.pages=new Array<number>(this.totalPages);
  this.produits=data;
},err=>{
  console.log(err);
});

  }
  onPageProduct(i){
    this.page=i;
    this.chercherProduits();  
  }
  onChercher(value: any){
    this.page=0;
    this.currentKeyword=value.keyword;
    this.chercherProduits();
  }

  chercherProduits(){
    //console.log(value);
    
    this.catService.getProductsByKeyword(this.currentKeyword,this.page,this.size)    
.subscribe(data=>{
  this.totalPages=data["page"].totalPages;
  this.pages=new Array<number>(this.totalPages);
  this.produits=data;
},err=>{
  console.log(err);
});
  }

  onDeleteProduct(p){
    let conf=confirm("Etes vous sure?");
    if(conf){
    this.catService.deleteRecouce(p._links.self.href)
    .subscribe(data=>{
      this.chercherProduits();
    },err=>{
      console.log(err);
    });
  }
  }

  onEditProduct(p){
    let url=p._links.self.href;
    this.router.navigateByUrl("/edit-product/"+btoa(url));
  }


}
