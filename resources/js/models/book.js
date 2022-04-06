class Book {
    constructor(id, title, author, publisher, genre, price, updated_at) {
        this._title = title;
        this._author = author;
        this._genre = genre;
        this._publisher = publisher;
        this._price = price;
        this._id = id;
        this._updated_at = updated_at;
    }

    static fromJson(json) {
        return new Book(
            json.id,
            json.title,
            json.author,
            json.publisher,
            json.genre,
            json.price
        );
    }

    toJson() {
        return {
            title: this._title,
            author: this._author,
            genre: this._genre,
            publisher: this._publisher,
            price: this._price,
        };
    }

    set id(id) {
        this._id = id;
    }
    set title(title) {
        this._title = title;
    }
    set author(author) {
        this._author = author;
    }
    set genre(genre) {
        this._genre = genre;
    }
    set publisher(publisher) {
        this._publisher = publisher;
    }
    set price(price) {
        this._price = price;
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get author() {
        return this._author;
    }
    get genre() {
        return this._genre;
    }
    get publisher() {
        return this._publisher;
    }
    get price() {
        return this._price;
    }
}

export default Book;
