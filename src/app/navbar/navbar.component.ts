import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ngOnInit() {
    $(document).ready(() => {
      $('.navbar-toggler').click(() => {
        $('.navbar-collapse').toggleClass('show');
      });
    });
  }

}
