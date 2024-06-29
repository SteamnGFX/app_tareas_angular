import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ITarea } from '../interfaces/tareas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private _endpoint: string = environment.endPoint;
  private apiUrl: string = this._endpoint + "Tareas/";


  constructor(private _http: HttpClient) { }

  //Definimos los metodos que invoca el api
    //Metodo para invocar un endpoint 
    getList(): Observable<ITarea[]> {
      return this._http.get<ITarea[]>(`${this.apiUrl}ListaTareas`);
    }

    //Metodo para invocar a agregar Tarea 
    add(tarea: ITarea): Observable<ITarea> {
      return this._http.post<ITarea>(`${this.apiUrl}AgregarTarea`, tarea);
    }

     //Metodo para invocar a modificar Tarea 
     update(tarea: ITarea): Observable<void> {
      return this._http.put<void>(`${this.apiUrl}ModificarTarea/${tarea.idTarea}`,tarea);
    }

     //Metodo para invocar a eliminar Tarea 
     delete(idTarea: number): Observable<void> {
      return this._http.delete<void>(`${this.apiUrl}EliminarTarea/${idTarea}`);
    }
}
