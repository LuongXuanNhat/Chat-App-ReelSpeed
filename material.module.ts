import { NgModule } from "@angular/core";
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    exports: [
       
        
    ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatTooltipModule,
        MatTabsModule, 
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule
      ],
    providers: [
      {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
    ]
})
export class MaterialModule {

}