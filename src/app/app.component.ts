import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ITarea } from './interfaces/tareas';
import { TareaService } from './services/tarea.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,FormsModule,NgFor,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'AppTareas';
  listaTareas: ITarea[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  
  nombreTarea: string = "";
  IDTareaActual: number = 0;

  constructor(private _tareaService: TareaService){
    this.obtenerTareas();
  };

  // Obtenemos las tareas de la API
  obtenerTareas(){
    this._tareaService.getList().subscribe({
      next:(data) => {
        this.listaTareas = data;
        this.isResultLoaded = true;
      }, error:(ex) => (console.log(ex))
    });
  }

  // Guardarmos las tareas de la API
  agregarTarea(){
    const request: ITarea = {
      idTarea: 0,
      nombre: this.nombreTarea
    }

    this._tareaService.add(request).subscribe({
      next:() => {
        this.nombreTarea = "";
        this.obtenerTareas();
      }, error:(ex) => (console.log(ex))
    });
  }

  obtenerTarea(data: ITarea){
    this.nombreTarea = data.nombre;
    this.IDTareaActual = data.idTarea;
  }
  
  modificarTarea(){
    const request: ITarea = {
      idTarea: this.IDTareaActual,
      nombre: this.nombreTarea
    }

    this._tareaService.update(request).subscribe({
      next:() => {
        this.nombreTarea = "";
        this.IDTareaActual = 0;
        this.obtenerTareas();
      }, error:(ex) => (console.log(ex))
    });
  }
  //Metodo encargado de gestionar si es un nuevo registro o actualización
    guardar(){
      if(this.IDTareaActual == 0){
        this.agregarTarea();
      } else {
        this.modificarTarea();
      }
    }

    //Eliminar tarea
    eliminarTarea(tarea: ITarea){
      this._tareaService.delete(tarea.idTarea).subscribe({
        next:() => {
          this.obtenerTareas();
        }, error:(ex) => (console.log(ex))
      });
    }

    
}
