import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { INotes } from './INotes';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private location: Location
  ) {}

  notesList: INotes[];
  noteTitle: string;
  noteId: Number;
  noteContent: string;
  username: string;
  discardDisabled: boolean = true;
  saveDisabled: boolean = true;
  titleChanged: boolean = false;
  contentChanged: boolean = false;
  currentNote: INotes = null;

  ngOnInit(): void {
    let authenticated = sessionStorage.getItem('authenticated');
    if (authenticated !== 'true') {
      this.location.replaceState('/');
      this.router.navigate(['login']);
    } else {
      this.username = sessionStorage.getItem('username');
      this.getUserNotes(this.username);
    }
  }

  getUserNotes(username: string) {
    this.apiService.getUserNotes(username).subscribe((data) => {
      this.notesList = <INotes[]>JSON.parse(JSON.stringify(data));
    });
  }

  openNote(note: INotes) {
    this.noteId = note.id;
    this.username = note.username;
    this.noteTitle = note.noteTitle;
    this.noteContent = note.noteContent;

    this.saveDisabled = false;
    this.discardDisabled = false;
    this.currentNote = note;
  }

  discard() {
    this.currentNote = {
      noteTitle: null,
      noteContent: null,
      id: null,
      username: null,
    };
    this.openNote(this.currentNote);
    this.saveDisabled = true;
    this.discardDisabled = true;
  }

  save() {
    if (this.currentNote == null) {
      this.currentNote = {
        id: null,
        username: sessionStorage.getItem('username'),
        noteTitle: this.noteTitle,
        noteContent: this.noteContent,
      };
    } else {
      this.currentNote.noteTitle = this.noteTitle;
      this.currentNote.noteContent = this.noteContent;
    }
    this.apiService.saveNewNote(this.currentNote).subscribe((data) => {
      this.getUserNotes(this.username);
      this.discard();
    });
  }

  onContentChange(content: string) {
    if (content.length > 0) {
      this.contentChanged = true;
    } else {
      this.contentChanged = false;
    }
    if (this.contentChanged && this.titleChanged) {
      this.saveDisabled = false;
      this.discardDisabled = false;
    } else {
      this.saveDisabled = true;
      this.discardDisabled = true;
    }
  }

  onTitleChange(title: string) {
    if (title.length > 0) {
      this.titleChanged = true;
    } else {
      this.titleChanged = false;
    }
    if (this.contentChanged && this.titleChanged) {
      this.saveDisabled = false;
      this.discardDisabled = false;
    } else {
      this.saveDisabled = true;
      this.discardDisabled = true;
    }
  }
}
