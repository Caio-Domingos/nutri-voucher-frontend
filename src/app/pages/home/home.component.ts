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
          html: `Preencha sua ficha de paciente, e após marque sua consulta.<br>
          Utilize sempre esse <strong>MESMO E-MAIL</strong> da ativação.<br>
          Uso <strong>PESSOAL</strong> e <strong>INTRANSFERÍVEL</strong>`,
          icon: 'success',
          confirmButtonText: 'Fechar',
        }).then((result) => {
          if (result.isConfirmed) {
            const a = document.createElement('a');
            a.href = 'http://consulta.weburn.com.br/anamnese';
            a.target = '_blank';
            a.click();
          }
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
