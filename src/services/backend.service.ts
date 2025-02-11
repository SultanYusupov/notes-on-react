import axios from "axios";
import {iNote} from "../interfaces/iNote.ts";

class BackendService {
    private URL = 'http://localhost:3001/note-list';
    noteListLength: number = 0;
    async getNoteList() {
        const {data} = await axios.get<iNote[]>(this.URL);
        return data;
    }

    async getNoteItem(id: string) {
        const {data} = await axios.get<iNote>(this.URL+'/'+id);
        data.id = Number(data.id);
        return data;
    }

    async editNote(id: string, content: object) {
        const {data} = await axios.patch<iNote>(this.URL+'/'+id, content);
        return data;
    }

    async createNote(content: iNote) {
        const {data} = await axios.post<iNote>(this.URL, content);
        return data;
    }

    async deleteNote(id: string) {
        const {data} = await axios.delete<iNote>(this.URL+'/'+id);
        return data;
    }

    get listLength() {
        return this.noteListLength;
    }
    set listLength(length: number) {
        this.noteListLength = length;
    }
}

export const noteService = new BackendService();