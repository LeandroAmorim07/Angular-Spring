import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

   courses$: Observable <Course[]>;
   displayedColumns=['name','category'];

   //CoursesService: CoursesService;

  constructor(private CoursesService: CoursesService,public dialog: MatDialog) {
    //this.courses=[];
    //this.CoursesService=new CoursesService();
    this.courses$=this.CoursesService.lista()
    .pipe(catchError(erro=>{
      this.onError('Erro ao carregar cursos');
      console.log(erro);
      return of([]);

  })
);

  }

  ngOnInit(): void {

  }

  onError(errorMsg: string){

      this.dialog.open(ErrorDialogComponent, {
        data: errorMsg


      });
    }
  }


