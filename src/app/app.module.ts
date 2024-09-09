import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from '@modules/home/not-found/not-found.component';

import { LayoutComponent } from '@layouts/layout/layout.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { SearchComponent } from '@shared/components/search/search.component';

@NgModule({ declarations: [
        AppComponent,
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        SearchComponent,
        NotFoundComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
