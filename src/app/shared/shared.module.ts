import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { LoadingSpinner } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { NgModule } from "@angular/core";


@NgModule({
  declarations:[
    AlertComponent,
    LoadingSpinner,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports:[
    CommonModule
  ],
  exports:[
    AlertComponent,
    LoadingSpinner,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ],
  entryComponents:[AlertComponent]
})
export class SharedModule {

}
