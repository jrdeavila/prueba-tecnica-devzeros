import React from "react";
import AuthController from "../controllers/auth_controller";
import BooksController from "../controllers/book_controller";
import FormCreateBook from "./FormCreateBook";

const booksCtrl = new BooksController();
const authCtrl = new AuthController();
class TableBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            numberItems: 5,
            pages: 0,
            currentPage: 1,
            initial: 0,
            final: 0,
        };
        this.updateBooks = this.updateBooks.bind(this);
        this.previusPage = this.previusPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.getCurrentBooks = this.getCurrentBooks.bind(this);
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
            this.getCurrentBooks();
        });
    }

    getCurrentBooks() {
        this.setState({
            final: this.state.books.length,
            pages: Math.ceil(this.state.books.length / this.state.numberItems),
        });
    }

    previusPage() {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1,
                initial: this.state.initial - this.state.numberItems,
            });
        }
    }

    nextPage() {
        if (this.state.currentPage < this.state.pages) {
            this.setState({
                currentPage: this.state.currentPage + 1,
                initial: this.state.initial + this.state.numberItems,
            });
        }
    }

    componentDidMount() {
        this.updateBooks();
    }

    logout() {
        authCtrl.logout();
        location.reload();
    }

    render() {
        return (
            <>
                <div className="position-fixed end-0 translate-middle">
                    <a onClick={this.logout} className="link-primary fs-3">
                        Logout
                    </a>
                </div>
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
                                <tbody>
                                    {this.state.books.slice(
                                        this.state.initial,
                                        this.state.currentPage *
                                            this.state.numberItems
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-between gap-4">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="btn-group">
                                        <button
                                            onClick={this.previusPage}
                                            className="btn btn-primary"
                                        >
                                            Prev
                                        </button>
                                        <button
                                            onClick={this.nextPage}
                                            className="btn btn-primary"
                                        >
                                            Next
                                        </button>
                                    </div>
                                    <div className="text-center">
                                        Pages {this.state.currentPage} {" of "}
                                        {this.state.pages}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
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
