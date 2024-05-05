import { Component } from '@angular/core';
import { NavBarComponent } from '../layout/nav-bar/nav-bar.component';
import { NewsService } from '../../services/news.service';
import { Topheadlines } from '../../models/topheadlines';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../layout/footer/footer.component';
import { HostListener } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
// import { NavBarComponent } from '../layout/nav-bar/nav-bar.component';
import { timeInterval } from 'rxjs';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavBarComponent, CommonModule, FooterComponent, MatProgressSpinnerModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {


  
  loading = false;
  newheadlines : Topheadlines[]  = [] 
  newheadline : Topheadlines[] = []

  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0
  totalPages: number = 0
  disablePrev: boolean = false
  isClicked: boolean = false;
  selectedItem: any 

  favorite : number = 0

 constructor(private newsService : NewsService ){}


getTopHeadlines() {
  this.newsService.getTopheadlines(this.pageSize, this.page).subscribe({

    
    next: ((res: any) => {
     
      this.totalItems = res.totalResults
      console.log('this totalitems:', this.totalItems)

        Object.assign(this.newheadlines, res.articles)
        this.newheadline = this.removeEmptyObj() 
        this.calculateTotalPages()
        // this.scrollToTop()
        console.log('This is the response',this.newheadline) 

      
      
      
    }),
    error: ((err: any)=>{
      console.log(err)
    }),
    complete: (() => {
      
    })
  })
}



calculateTotalPages() {
  this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  console.log('total pages',this.totalPages)
}



nextPage() {
  if (this.page < this.totalPages) {
    this.page++;
  }
  this.getTopHeadlines()
  this.disablePrev = false
}

prevPage() {
  if (this.page > 1) {
    this.page--;
  }
  this.getTopHeadlines()
  if (this.page === 1) {
    this.disablePrev = true; 
  }

}





  


removeEmptyObj () {
 return  this.newheadlines.filter((result: any) => {
      return result.urlToImage !== null || undefined
  })
}



receiveDatafromChild(data : any) {
  Object.assign(this.newheadline,data)
  console.log('From child',data)
 
}



AddTofavourite(item: any) {
   this.favorite++
   this.isClicked = true
   this.selectedItem = item
    return this.favorite

}




  ngOnInit() {
    this.getTopHeadlines()
    // this.Searchresult()
    // console.log(environment.apiKey)
  }


}
