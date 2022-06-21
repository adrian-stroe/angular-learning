import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{

    @Output() featureSelected = new EventEmitter<string>();//type that will be emitted is in <>

    onSelect(feature: string){
        this.featureSelected.emit(feature)
    }

     
}