import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
//CMMT: Importacion de servicios
import { MediaQueryService } from '../../services/media-query.service';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav-item',
  imports: [MatButtonModule, MatIconModule, MatMenuModule,
    MatToolbarModule, RouterModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss'
})
export class NavItemComponent {
  constructor(
    private mediaQueryService: MediaQueryService,
  ) {}

  @Input()
  breakpoints = Breakpoints;
  currentBreakpoint?: string;
  currentWidth?: string;


  ngOnInit() {

    this.mediaQueryService.breakpoint$.subscribe(() => {
      this.mediaQueryService.triggerProcesses();
      this.currentBreakpoint = this.mediaQueryService.returnBreakpoint();
    });


    this.currentWidth = this.mediaQueryService.returnWidth();


    //console.log(this.constantes.IMGBAN001);
  }
}
