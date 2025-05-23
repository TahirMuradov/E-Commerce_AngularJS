import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClientService } from '../../../../services/common/http-client.service';
import ResultResponseType from '../../../../models/responseType/ResultResponseType';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/ui/custom-toastr.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-email-confirmation',
  imports: [NgFor, RouterLink,TranslateModule,CommonModule],
  templateUrl: './email-confirmation.component.html',
  styleUrl: './email-confirmation.component.css',
})
export class EmailConfirmationComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpClientService,
      public customToastrService: CustomToastrService,
      public translate:TranslateService
  ) {}
  isChecked: boolean=false;
  isTryAgain: boolean=false;
     errorMessages:string[]=[] ;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: async (params) => {
        const queryToken: string = params['token'];
        const queryEmail: string = params['email'];
        if (queryToken && queryEmail) {
          this.httpService.put<
            ResultResponseType<null>,
            { email: string; token: string }
          >(
            { controller: 'Auth', action: 'ChecekdConfirmedEmailToken' },
            { email:decodeURIComponent(queryEmail), token:decodeURIComponent(queryToken) }
          ).subscribe({
            next:(value:ResultResponseType<null>)=> {
              if (value.isSuccess) {
                this.isChecked=true;
              }
            },
            error:(response: HttpErrorResponse)=>{

        if (Array.isArray(response?.error?.messages)) {
     response?.error?.messages?.forEach(message => {
        this.errorMessages.push(`${message}`)
      });
       
        } else if (typeof response?.error?.message === 'string') {
        this.errorMessages.push(`${response.error?.message}`);
        } else {
          this.errorMessages.push(`${JSON.stringify(response.error)}`);
        }
        
        this.isTryAgain=true;
        this.customToastrService.message(this.errorMessages.join('\n'), this.translate.instant("MessageType.error"), {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        })
            }
          });
        }
      },
    });
  }
}
