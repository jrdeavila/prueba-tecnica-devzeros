<?php

namespace App\Http\Controllers;

use App\Http\Middleware\HttpCatchException;
use App\Http\Requests\BookRequest;
use App\Models\Book;

/** 
 * @OA\Info(
 *    version="1.0.0",
 *    title="Books Store",
 * ) 
 */

class BookController extends Controller
{


  function __construct()
  {
    $middleware = HttpCatchException::class;
    $this->middleware($middleware);
  }

  /** 
   * @OA\Get(
   *    path="/api/books",
   *    tags={"books"},
   *    summary="List all books",
   *    description="List all books",
   *   
   *  @OA\Response(
   *     response=200,
   *     description="Successful operation",
   *  ),
   *  @OA\Response(
   *    response=500,
   *    description="Internal Server Error",
   *  ) 
   * )
   */



  public function index()
  {
    return Book::latest()->get();
  }

  /** 
   * @OA\Post(
   *    path="/api/books/",
   *    tags={"books"},
   *    summary="Store a book",
   *    description="Store a book",
   *  @OA\Parameter(
   *     description="Title of book",
   *     in="query",
   *     name="title",
   *     required=true,
   *     @OA\Schema(type="string"),
   *     @OA\Examples(example="string", value="The theory of everything", summary="A name"),
   *  ),
   *  @OA\Parameter(
   *     description="Author of book",
   *     in="query",
   *     name="author",
   *     required=true,
   *     @OA\Schema(type="string"),
   *     @OA\Examples(example="string", value="Robin Sharma", summary="An author name"),
   *  ),
   *  @OA\Parameter(
   *     description="Publisher of book",
   *     in="query",
   *     name="publisher",
   *     required=true,
   *     @OA\Schema(type="string"),
   *     @OA\Examples(example="string", value="Jaiko Publishing House", summary="A publisher company"),
   *  ),
   *  @OA\Parameter(
   *     description="Genre of book",
   *     in="query",
   *     name="genre",
   *     required=true,
   *     @OA\Schema(type="string"),
   *     @OA\Examples(example="string", value="Fiction", summary="A genre"),
   *  ),
   *  @OA\Parameter(
   *     description="Price of book",
   *     in="query",
   *     name="price",
   *     required=true,
   *     @OA\Schema(type="string"),
   *     @OA\Examples(example="string", value="141", summary="A price of book"),
   *  ),
   *  @OA\Response(
   *     response=200,
   *     description="Successful operation",
   *  ),
   *  @OA\Response(
   *    response=500,
   *    description="Internal Server Error",
   *  ),
   *  @OA\Response(
   *    response=404,
   *    description="Not Found",
   *  ),
   * )
   */
  public function store(BookRequest $request)
  {
    return Book::create($request->all());
  }
  /** 
   * @OA\Delete(
   *    path="/api/books/{id}",
   *    tags={"books"},
   *    summary="Delete a book",
   *    description="Delete a book",
   *  @OA\Parameter(
   *     description="ID of book to delete",
   *     in="path",
   *     name="id",
   *     required=true,
   *     @OA\Schema(type="integer"),
   *     @OA\Examples(example="int", value="1", summary="An int value."),
   *  ),
   *  @OA\Response(
   *     response=200,
   *     description="Successful operation",
   *  ),
   *  @OA\Response(
   *    response=500,
   *    description="Internal Server Error",
   *  ),
   *  @OA\Response(
   *    response=404,
   *    description="Not Found",
   *  ),
   * )
   */


  public function destroy(Book $book)
  {
    return $book->delete();
  }


  /** 
   * @OA\Put(
   *    path="/api/books/{id}",
   *    tags={"books"},
   *    summary="Update a book",
   *    description="Update a book",
   *  @OA\Parameter(
   *     description="ID of book to update",
   *     in="path",
   *     name="id",
   *     required=true,
   *     @OA\Schema(type="integer"),
   *     @OA\Examples(example="int", value="1", summary="An int value."),
   *  ),
   *  @OA\Parameter(
   *     description="Name of book",
   *     in="query",
   *     name="name",
   *     required=true,
   *     @OA\Schema(type="string"),
   *     @OA\Examples(example="string", value="The theory of everything", summary="A name"),
   *  ),
   *  @OA\Parameter(
   *     description="Author of book",
   *     in="query",
   *     name="author",
   *     required=true,
   *     @OA\Schema(type="string"),
   *     @OA\Examples(example="string", value="Robin Sharma", summary="An author name"),
   *  ),
   *  @OA\Parameter(
   *     description="Publisher of book",
   *     in="query",
   *     name="publisher",
   *     required=true,
   *     @OA\Schema(type="string"),
   *     @OA\Examples(example="string", value="Jaiko Publishing House", summary="A publisher company"),
   *  ),
   *  @OA\Parameter(
   *     description="Genre of book",
   *     in="query",
   *     name="genre",
   *     required=true,
   *     @OA\Schema(type="string"),
   *     @OA\Examples(example="string", value="Fiction", summary="A genre"),
   *  ),
   *  @OA\Parameter(
   *     description="Price of book",
   *     in="query",
   *     name="price",
   *     required=true,
   *     @OA\Schema(type="int"),
   *     @OA\Examples(example="int", value="141", summary="A price of book"),
   *  ),
   *  @OA\Response(
   *     response=200,
   *     description="Successful operation",
   *  ),
   *  @OA\Response(
   *    response=500,
   *    description="Internal Server Error",
   *  ),
   *  @OA\Response(
   *    response=404,
   *    description="Not Found",
   *  ),
   * )
   */
  public function update(BookRequest $request, Book  $book)
  {
    return $book->update($request->all());
  }
}
