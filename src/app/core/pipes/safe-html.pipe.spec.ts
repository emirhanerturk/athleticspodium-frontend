import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeHtmlPipe(TestBed.inject(DomSanitizer));
    expect(pipe).toBeTruthy();
  });
});
