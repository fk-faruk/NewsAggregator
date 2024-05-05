import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';



export const Guard : CanActivateFn = () => {



  let isAuthenticated : boolean = true

  if (isAuthenticated) {
    return true
  }else {
    return false
    
  }
}

