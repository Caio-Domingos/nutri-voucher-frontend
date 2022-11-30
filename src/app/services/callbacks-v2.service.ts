import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CallbacksV2Service {
  constructor(private http: HttpClient) {}

  useVoucher(email: string, voucher: string) {
    return this.http.post(
      environment.apiThinkless + '/api/utils/vouchers/invalid',
      { email, voucher }
    );
  }
}
