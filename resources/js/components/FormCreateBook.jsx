import React from "react";
import { Modal, Button } from "react-bootstrap";
import FormInput from "./FormInput";
import Book from "../models/book";
import BooksController from "../controllers/book_controller";

const booksCtrl = new BooksController();
class FormCreateBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            data: {},
            errors: null,
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.getData = this.getData.bind(this);
        this.saveBook = this.saveBook.bind(this);
    }

    componentDidMount() {
        let book = this.props.book;
        this.setState({
            data: book?.toJson() ?? {},
        });
    }

    handleClose() {
        this.setState({
            show: false,
        });
    }
    handleShow() {
        this.setState({
            show: true,
        });
    }

    getData(data) {
        this.setState({
            data: data,
        });
    }

    saveBook() {
        let book = this.props.book;
        let callback = "createBook";
        if (book) {
            book = this.props.book;
            book.title = this.state.data.title;
            book.author = this.state.data.author;
            book.publisher = this.state.data.publisher;
            book.genre = this.state.data.genre;
            book.price = this.state.data.price;
            callback = "updateBook";
        } else {
            book = Book.fromJson(this.state.data);
        }
        let func = booksCtrl[callback];
        func(book).then((value) => {
            if (value === true) {
                this.handleClose();
                this.props.onCreate();
                this.setState({
                    errors: null,
                });
            }
            if (typeof value === "object") {
                this.setState({
                    errors: value,
                });
            }
        });
    }

    render() {
        return (
            <>
                <button
                    className={`btn text-white btn-${this.props.btnVariant ?? "primary"}`}
                    variant={this.props.btnVariant}
                    onClick={this.handleShow}
                >
                    {this.props.children}
                </button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Book Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormBookData
                            data={this.state.data}
                            errors={this.state.errors}
                            onChange={this.getData}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.saveBook}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

class FormBookData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            author: "",
            publisher: "",
            genre: "",
            price: 0,
        };
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
        this.handleChangePublisher = this.handleChangePublisher.bind(this);
        this.handleChangeGenre = this.handleChangeGenre.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
    }

    componentDidMount() {
        let data = this.props.data;
        if (Object.keys(data).length > 0) {
            this.setState(
                {
                    title: this.props.data.title,
                    author: this.props.data.author,
                    publisher: this.props.data.publisher,
                    genre: this.props.data.genre,
                    price: this.props.data.price,
                },
                this.wasChanged
            );
        }
    }

    wasChanged() {
        this.props.onChange({
            title: this.state.title,
            author: this.state.author,
            publisher: this.state.publisher,
            genre: this.state.genre,
            price: this.state.price,
        });
    }

    handleChangeTitle(event) {
        this.setState(
            {
                title: event.target.value,
            },
            this.wasChanged
        );
        this.wasChanged();
    }
    handleChangeAuthor(event) {
        this.setState(
            {
                author: event.target.value,
            },
            this.wasChanged
        );
    }
    handleChangePublisher(event) {
        this.setState(
            {
                publisher: event.target.value,
            },
            this.wasChanged
        );
    }
    handleChangeGenre(event) {
        this.setState(
            {
                genre: event.target.value,
            },
            this.wasChanged
        );
    }
    handleChangePrice(event) {
        this.setState(
            {
                price: event.target.value,
            },
            this.wasChanged
        );
    }

    render() {
        return (
            <div className="row gy-3">
                <div className="col-md-12">
                    <FormInput
                        value={this.state.title}
                        onChange={this.handleChangeTitle}
                        errorMessage={this.props.errors?.title}
                        type="text"
                        label="Title"
                    />
                </div>
                <div className="col-md-12">
                    <FormInput
                        value={this.state.author}
                        onChange={this.handleChangeAuthor}
                        errorMessage={this.props.errors?.author}
                        type="text"
                        label="Author"
                    />
                </div>
                <div className="col-md-12">
                    <FormInput
                        value={this.state.publisher}
                        onChange={this.handleChangePublisher}
                        errorMessage={this.props.errors?.publisher}
                        type="text"
                        label="Publisher"
                    />
                </div>
                <div className="col-md-6">
                    <FormInput
                        value={this.state.genre}
                        onChange={this.handleChangeGenre}
                        errorMessage={this.props.errors?.genre}
                        type="text"
                        label="Genre"
                    />
                </div>
                <div className="col-md-6">
                    <FormInput
                        value={this.state.price}
                        onChange={this.handleChangePrice}
                        errorMessage={this.props.errors?.price}
                        type="number"
                        label="Price"
                    />
                </div>
            </div>
        );
    }
}

export default FormCreateBook;
