import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URLSearchParams } from 'url';
import { INotes } from './notes/INotes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  authUser(username: string, password: string) {
    let postBody = new HttpParams();
    postBody = postBody.append("username",username);
    postBody = postBody.append("password",password);
    let httpOptions = {
      headers : new HttpHeaders({
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : "Basic " + btoa('mMLvP5KetCR!:yOB6#&2brNU@')
      })
    }
    return this.httpClient.post("http://localhost:8080/userLogin", postBody, httpOptions);
  }

  getUserNotes(username: string) {
    let postBody = new HttpParams();
    postBody = postBody.append("username",username);
    let httpOptions = {
      headers : new HttpHeaders({
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : "Basic " + btoa('mMLvP5KetCR!:yOB6#&2brNU@')
      })
    }
    return this.httpClient.post("http://localhost:8080/notes", postBody, httpOptions);
  }

  saveNewNote(note : INotes) {
    let postBody = new HttpParams();
    postBody = postBody.append("id",note.id == null ? "null" : note.id.toString());
    postBody = postBody.append("username",note.username);
    postBody = postBody.append("noteTitle",note.noteTitle);
    postBody = postBody.append("noteContent",note.noteContent);
    let httpOptions = {
      headers : new HttpHeaders({
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : "Basic " + btoa('mMLvP5KetCR!:yOB6#&2brNU@')
      })
    }
    return this.httpClient.post("http://localhost:8080/addNote", postBody, httpOptions);
  }

}
