import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';

//CMMT: Importacion de constantes
import { SVGS } from '../../models/constants';
import { SOCIALMEDIA } from '../../models/constants';


//CMMT: Importacion de servicios
import { MediaQueryService } from '../../services/media-query.service';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-footer-item',
  imports: [  MatButtonModule, MatIconModule, MatGridListModule, MatListModule,
    RouterModule],
  templateUrl: './footer-item.component.html',
  styleUrl: './footer-item.component.scss'
})
export class FooterItemComponent {
  svgs = [...SVGS];

  socialmedia = [...SOCIALMEDIA];
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


    ////console.log(this.constantes.IMGBAN001);
  }
}
