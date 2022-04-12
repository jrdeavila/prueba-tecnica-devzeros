import axios from "axios";
import OauthConfig from "../config/oauth_constants";
import Book from "../models/book";

class BookController {
    catchMethod = async (callback, ...args) => {
        try {
            return await callback.apply(this, args);
        } catch (err) {
            if (err.response.status === 422) {
                return err.response.data.errors;
            }
            if (err.response.status === 500) {
                console.log(err.response.data);
                window.alert(err.response.data.message);
            }
            if (err.response.status === 401) {
                console.log(err.response.data);
                localStorage.removeItem("token");
            }
            if (err.response.status === 405) {
                console.log(err.response.data);
            }
        }
    };

    async getBooks() {
        const callback = async () => {
            let res = await axios.get(`/api/books`, {
                headers: OauthConfig.headers,
            });
            let data = res.data;
            return data.map((bookJson) => Book.fromJson(bookJson));
        };
        return await this.catchMethod(callback);
    }

    async setBook(book) {
        const callback = async (book) => {
            const uri = book.id ? `/api/books/${book.id}` : "/api/books";
            const req = book.id ? axios.put : axios.post;
            await req(
                uri,
                book.toJson(),
                {
                    headers: OauthConfig.headers,
                },
            );
            return true;
        };
        return await this.catchMethod(callback, book);
    }

    async deleteBook(id) {
        const callback = async (id) => {
            await axios.delete(`/api/books/${id}`, {
                headers: OauthConfig.headers,
            });
            return true;
        };
        return await this.catchMethod(callback, id);
    }
}

export default BookController;
