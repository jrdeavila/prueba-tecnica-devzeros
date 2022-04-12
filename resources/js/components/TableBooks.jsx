import React, { memo, useEffect, useState } from "react";
import AuthController from "../controllers/auth_controller";
import BooksController from "../controllers/book_controller";
import FormCreateBook from "./FormCreateBook";

const booksCtrl = new BooksController();
const authCtrl = new AuthController();


const TableBooks = memo(props => {

  const [books, setBooks] = useState([]);
  const [itemAmount, _] = useState(5);
  const [initialIndex, setInitialIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const headers = [
    'Title',
    'Author',
    'Publisher',
    'Genre',
    'Price',
    'Actions',
  ];

  useEffect(() => {
    updateBooks();
  }, [
    books.length === 0,
  ]);


  let updateBooks = async () => {
    let books = await booksCtrl.getBooks();

    setBooks(books);
    setTotalPages(Math.ceil(books.length / itemAmount));
  }

  let nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setInitialIndex(initialIndex + itemAmount);
    }
  };
  let prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setInitialIndex(initialIndex - itemAmount);
    }
  };


  return <>
    <ButtonLogin />
    <div className="d-flex justify-content-center mt-5">
      <div className="card w-50">
        <div className="card-header bg-primary">
          <div className="d-flex justify-content-between">
            <div className="card-title text-white fs-1">
              Book Store
            </div>
            <FormCreateBook
              btnVariant="secondary"
              onCreate={updateBooks}
            >
              <i className="fs-1 bi bi-plus"></i>
            </FormCreateBook>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-responsive">
            <thead>
              <tr>
                {headers.map((header) => {
                  return <th scope="col" key={header}>{header}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {
                books.length > 0 ? (
                  <Items
                    books={books.slice(initialIndex, initialIndex + itemAmount)}
                    onActionBook={updateBooks}
                  />
                ) : (
                  <tr>
                    <th
                      scope="row"
                      colSpan={headers.length}
                      className="text-center"
                    >
                      No books found
                    </th>
                  </tr>
                )
              }

            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between gap-4">
            <div className="d-flex align-items-center gap-3">
              <div className="btn-group">
                <button
                  onClick={prevPage}
                  className="btn btn-primary"
                >
                  <i className="bi bi-arrow-left"></i>
                </button>
                <button
                  onClick={nextPage}
                  className="btn btn-primary"
                >
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
              <div className="text-center">
                Pages {currentPage} {" of "}
                {totalPages}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>

});

function ButtonLogin() {
  let logout = () => {
    authCtrl.logout();
  };
  return (
    <div className="position-fixed end-0 translate-middle">
      <a onClick={logout} className="link-primary fs-3">
        Logout
      </a>
    </div>
  );
}


function Items(props) {
  const { books } = props;

  let RowsBooks = books.map((book) => {
    return <ItemBook key={book.id} book={book} onAction={props.onActionBook} />
  });

  return (
    <>
      {RowsBooks}
    </>
  );
}

function ItemBook({ book, onAction }) {

  let deleteBook = () => {
    booksCtrl
      .deleteBook(book.id)
      .then(() => onAction());
  }


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
              onCreate={onAction}
            >
              <i className=" fs-3 bi bi-pencil"></i>
            </FormCreateBook>

            <button
              onClick={() => deleteBook(book.id)}
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

export default TableBooks;
