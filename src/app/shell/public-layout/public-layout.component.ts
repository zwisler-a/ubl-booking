import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.css'],
})
export class PublicLayoutComponent implements OnInit {
  width: number;
  version = environment.version;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.width = this.activatedRoute.snapshot.firstChild.data.width;
    });

    this.width = this.activatedRoute.snapshot.firstChild.data.width;
  }
}
