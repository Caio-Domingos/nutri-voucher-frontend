import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CallbacksV2Service } from 'src/app/services/callbacks-v2.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = false;
  constructor(private callbacks: CallbacksV2Service) {}

  ngOnInit(): void {}

  submit(f: NgForm) {
    this.loading = true;
    const formData: { email: string; voucher: string } = f.form.getRawValue();
    formData.voucher = formData.voucher.toLocaleUpperCase();

    console.log(formData);

    this.callbacks.useVoucher(formData.email, formData.voucher).subscribe({
      next: (value) => {
        console.log('next', value);

        Swal.fire({
          title: 'Voucher Criado!',
          text: 'Em breve seus créditos Nutri serão inseridos.',
          icon: 'success',
          confirmButtonText: 'Fechar',
        });
        this.loading = false;
      },
      error: (error) => {
        console.log('error', error);
        Swal.fire({
          title: 'Voucher inválido!',
          text: 'Verifique a validade do voucher usado!',
          icon: 'error',
          confirmButtonText: 'Fechar',
        });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
