export interface iNote {
    id?: number,// TODO убрать вопросительный знак
    title: string,
    text: string,
    dateCreate: string
}

// когда отправляем запрос на создание новой заметки, у него нет id
// это как раз делает интерфейс, похожий на iNote, но без поля id
export interface iNoteData extends Omit<iNote, 'id'>{}