import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonComponent } from './lesson.component';
import { DayOneComponent } from './day-one/day-one.component';
import { DataBindingComponent } from './day-one/data-binding/data-binding.component';
import { OneWayComponent } from './day-one/data-binding/one-way/one-way.component';
import { TwoWayComponent } from './day-one/data-binding/two-way/two-way.component';
import { FormsModule } from '@angular/forms';
import { DayTwoComponent } from './day-two/day-two.component';
import { DirectivesComponent } from './day-two/directives/directives.component';
import { StructuralDirectivesComponent } from './day-two/directives/structural-directives/structural-directives.component';
import { NgIfComponent } from './day-two/directives/structural-directives/ng-if/ng-if.component';
import { NgForComponent } from './day-two/directives/structural-directives/ng-for/ng-for.component';
import { NgSwitchComponent } from './day-two/directives/structural-directives/ng-switch/ng-switch.component';
import { AttributeDirectiveComponent } from './day-two/directives/attribute-directive/attribute-directive.component';
import { NgClassComponent } from './day-two/directives/attribute-directive/ng-class/ng-class.component';
import { NgStyleComponent } from './day-two/directives/attribute-directive/ng-style/ng-style.component';
import { HightLightDirective } from './day-two/directives/custom-directive/hight-light.directive';
import { DayThreeComponent } from './day-three/day-three.component';
import { ListMovieComponent } from './day-three/list-movie/list-movie.component';
import { ItemMovieComponent } from './day-three/item-movie/item-movie.component';
import { PipeComponent } from './pipe/pipe.component';



@NgModule({
  declarations: [
    LessonComponent,
    DayOneComponent,
    DataBindingComponent,
    OneWayComponent,
    TwoWayComponent,
    DayTwoComponent,
    DirectivesComponent,
    StructuralDirectivesComponent,
    NgIfComponent,
    NgForComponent,
    NgSwitchComponent,
    AttributeDirectiveComponent,
    NgClassComponent,
    NgStyleComponent,
    HightLightDirective,
    DayThreeComponent,
    ListMovieComponent,
    ItemMovieComponent,
    PipeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [LessonComponent],
})
export class LessonModule { }
