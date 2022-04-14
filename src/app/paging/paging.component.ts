import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() page : number;
  @Output() newPage : EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  prevPage(){
    if (this.page > 1){
      this.newPage.emit(this.page - 1);
    }
  }

  nextPage(){
    this.newPage.emit(this.page + 1);
  }

}
