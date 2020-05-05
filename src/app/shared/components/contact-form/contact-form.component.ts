import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContactService } from "@services/contact.service";
import { EContactSubject } from "@enums/contact-subject.enum";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  loading: boolean = false;
  result: boolean = null;

  EContactSubject = EContactSubject;
  
  formValues = {
    name: '',
    email: '',
    subject: EContactSubject.GENERAL_MESSAGE,
    message: '',
    file: null,
  };

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() {
  }

  async formSubmit(form: NgForm){

    if (form.status !== 'VALID') return;

    this.loading = true;

    const res = await this.contactService.Create(this.formValues);
    if (res.success){
      this.result = true;
    } else {
      alert('Something went wrong!');
    }

    this.loading = false;

  }

}
