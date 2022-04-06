import React from "react";
import BooksController from "../controllers/book_controller";
import FormCreateBook from "./FormCreateBook";

const booksCtrl = new BooksController();
class TableBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
        };
        this.updateBooks = this.updateBooks.bind(this);
    }
    updateBooks() {
        booksCtrl.getBooks().then((books) => {
            let books_comp = books.map((book) => {
                return (
                    <ItemBook
                        onActionBook={this.updateBooks}
                        book={book}
                        key={book.id}
                    />
                );
            });
            this.setState({ books: books_comp });
        });
    }

    componentDidMount() {
        this.updateBooks();
    }

    render() {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="card w-50">
                    <div className="card-header bg-primary">
                        <div className="d-flex justify-content-between">
                            <div className="card-title text-white fs-1">
                                Book Store
                            </div>
                            <FormCreateBook
                                btnVariant="secondary"
                                onCreate={this.updateBooks}
                            >
                                <i className="fs-1 bi bi-plus"></i>
                            </FormCreateBook>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Publisher</th>
                                    <th>Genre</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>{this.state.books}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

class ItemBook extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteBook() {
        booksCtrl
            .deleteBook(this.props.book.id)
            .then(() => this.props.onActionBook());
    }

    render() {
        let book = this.props.book;
        return (
            <>
                <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>{book.genre}</td>
                    <td>{book.price}</td>
                    <td>
                        <div className="btn-group">
                            <FormCreateBook
                                btnVariant="warning"
                                book={book}
                                onCreate={this.props.onActionBook}
                            >
                                <i className=" fs-3 bi bi-pencil"></i>
                            </FormCreateBook>

                            <button
                                onClick={() => this.deleteBook(book.id)}
                                className="btn btn-danger"
                            >
                                <i className="fs-3 bi bi-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </>
        );
    }
}

export default TableBooks;
