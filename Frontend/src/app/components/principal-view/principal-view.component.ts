import { Component } from '@angular/core';
import { AuthenticateState } from '../../core/class/AuthenticateState';
import { RouterLink } from '@angular/router';
import { NarBarComponent } from '../nar-bar/nar-bar.component';
import { NewsapicolombiaService } from '../../core/services/newapi/newsapicolombia.service';
import { NewsInterface } from '../../interfaces/News';

@Component({
  selector: 'app-principal-view',
  standalone: true,
  imports: [RouterLink, NarBarComponent],
  templateUrl: './principal-view.component.html',
  styleUrl: './principal-view.component.css'
})
export class PrincipalViewComponent {

  newsColombia!: NewsInterface;

  constructor(private authenticate: AuthenticateState, private news: NewsapicolombiaService) {
    
  }

  ngOnInit() {
    this.news.getInfoNews().subscribe({
      next: Response => {
        this.newsColombia = Response;
        this.newsColombia.articles = this.newsColombia.articles.slice(0,9)
      }
    })
  }

  goSign() {
    this.authenticate.setSignShow(true);
    this.authenticate.setIsLoginShow(true);
    this.authenticate.setLogShow(false);

    console.log(this.newsColombia)
  }
}
