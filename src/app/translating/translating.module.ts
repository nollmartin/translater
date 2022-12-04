import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslatingComponent } from './translating.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [TranslatingComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  exports: [TranslatingComponent],
})
export class TranslatingModule {}
