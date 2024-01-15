import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiService } from '../ApiService/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthenComponent } from '../authen/authen.component';
import { AnimationService } from '../animation/animation.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor( private animation: AnimationService,
    private elementRef: ElementRef){

  }
  ngOnInit(){
    this.animation.attachAnimationListener(this.elementRef);
  }
  Boom(event: Event){
    const target = event.target as HTMLElement;
    this.animation.animateButton(target);
  }
}
