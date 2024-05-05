import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NewsService } from '../../../services/news.service';
import { Topheadlines } from '../../../models/topheadlines';
import { Output, EventEmitter, Input } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {


  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0
  totalPages: number = 0
  disablePrev: boolean = false
  

  @Input() dataFromParent: any;
  @Output() childEvent = new EventEmitter<any>();

  dataArr : Topheadlines[] = []

  searchparams : string = ''
  constructor(private routes: Router, private toast : ToastrService, private service: NewsService, private snackBar : MatSnackBar){}

  isSignedIn : boolean = true

  signIn() {
    if (this.isSignedIn === true){
      this.isSignedIn = !this.isSignedIn
      this.snackBar.open('User signed in successfully', 'close', {
        duration: 2000, // duration in milliseconds
      })

    }else {
      this.isSignedIn = !this.isSignedIn
      this.snackBar.open('User is not signed in', 'close', {
        duration: 2000, // duration in milliseconds
      })
    }
    
  }






  searchPhrase() {
    this.service.searchArticles(this.searchparams, this.pageSize, this.page).subscribe({
      next: ((result) => {
        this.totalItems = result.totalResults
        Object.assign(this.dataArr, result.articles)
        this.calculateTotalPages()
        this.sendDataToParent()
          console.log('searchParamas result>>>', this.dataArr)
      }),
      error: ((err) => {
          console.log(err)
      }),
      complete: (() => {

      })
    })
    // console.log(this.searchparams)
  }


  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    console.log('total pages',this.totalPages)
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
    }
    this.searchPhrase()
    this.disablePrev = false
  }
  
  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
    this.searchPhrase()
    if (this.page === 1) {
      this.disablePrev = true; 
    }
  
  }
  



  sendDataToParent() {
    this.childEvent.emit(this.dataArr)   
  }
  


}


