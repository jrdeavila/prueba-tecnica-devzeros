import axios from "axios";
import Book from "../models/book";
class BookController {
    async getBooks() {
        let res = await axios.get(`/api/books`);
        let data = res.data;
        let status = res.status;
        if (status === 200) {
            return data.map(
                (bookJson) =>
                    new Book(
                        bookJson.id,
                        bookJson.title,
                        bookJson.author,
                        bookJson.publisher,
                        bookJson.genre,
                        bookJson.price
                    )
            );
        }
        if (status === 500) {
            window.alert(data.error);
        }
    }

    async getBook(id) {
        let res = await axios.get(`/api/books/${id}`);
        let data = res.data;
        let status = res.status;
        if (status === 200) {
            return new Book(
                data.title,
                data.author,
                data.publisher,
                data.genre,
                data.price
            );
        } else if (status === 404) {
            window.alert(data.error);
        } else return;
    }

    async createBook(book) {
        try {
            let res = await axios.post("/api/books", book.toJson());
            let data = res.data;
            let status = res.status;
            if (status === 500) window.alert(data.error);
            else return true;
        } catch (err) {
            if (err.response.status === 406) {
                return err.response.data.error;
            }
        }
    }
    async updateBook(book) {
        try {
            let res = await axios.put(`/api/books/${book.id}`, book.toJson());
            let data = res.data;
            let status = res.status;
            if (status === 500 || status === 404) window.alert(data.error);
            else return true;
        } catch (err) {
            if (err.response.status === 406) {
                return err.response.data.error;
            }
        }
    }
    async deleteBook(id) {
        let res = await axios.delete(`/api/books/${id}`);
        let data = res.data;
        let status = res.status;
        if (status === 500) {
            window.alert(data.error);
        } else return true;
    }
}

export default BookController;
