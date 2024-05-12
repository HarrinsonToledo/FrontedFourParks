import { Component, OnInit } from '@angular/core';
import { AuthenticateState } from '../../core/class/AuthenticateState';
import { RouterLink } from '@angular/router';
import { NarBarComponent } from '../nar-bar/nar-bar.component';
import { NewsInterface } from '../../interfaces/News';
import { NewsService } from '../../core/services/news/news.service';

@Component({
  selector: 'app-principal-view',
  standalone: true,
  imports: [RouterLink, NarBarComponent],
  templateUrl: './principal-view.component.html',
  styleUrl: './principal-view.component.css'
})
export class PrincipalViewComponent implements OnInit {

  public News!: Array<NewsInterface>;

  constructor(private authenticate: AuthenticateState, private news: NewsService) {

  }

  ngOnInit() {
    this.news.getNews().subscribe({
      next: Response => {
        this.News = Response
      },
      error: Error =>{

      }
    })
    this.authenticate.setIsLoginShow(false)
  }

  goSign() {
    this.authenticate.setSignShow(true);
    this.authenticate.setIsLoginShow(true);
    this.authenticate.setLogShow(false);
  }
}
