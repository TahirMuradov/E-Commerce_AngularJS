import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,} from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule,} from '@angular/common';
import { AuthService } from '../../../../services/common/auth.service';
@Component({
  selector: 'app-email-confirmation',
  imports: [TranslateModule,CommonModule],
  templateUrl: './email-confirmation.component.html',
  styleUrl: './email-confirmation.component.css',
})
export class EmailConfirmationComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
  private authService:AuthService,      
      public translate:TranslateService
  ) {}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: async (params) => {
        const queryToken: string = params['token'];
        const queryEmail: string = params['email'];
  this.authService.checkEmailConfirmationToken(queryEmail,queryToken)
    
      },
    });
  }
}
