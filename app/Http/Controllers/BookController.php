<?php




namespace App\Http\Controllers;

use App\Models\Book;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/** 
 * @OA\Info(
 *    version="1.0.0",
 *    title="Books Store",
 * ) 
 */

class BookController extends Controller
{

    /** 
     * @OA\Get(
     *    path="/api/books",
     *    tags={"books"},
     *    summary="List all books",
     *    description="List all books",
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

    private $_RULES = [
        'title' => 'required|string|max:255|unique:books',
        'author' => 'required|string|max:255',
        'publisher' => 'required|string|max:255',
        'genre' => 'required|string|max:255',
        'price' => 'required|numeric',
    ];

    public function index()
    {
        try {
            $books = Book::all();
            return response()->json($books, 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /** 
     * @OA\Get(
     *    path="/api/books/{id}",
     *    tags={"books"},
     *    summary="Get an only book",
     *    description="Get an only book",
     *  @OA\Parameter(
     *     description="ID of book to return",
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
    public function show($id)
    {
        try {
            $book = Book::find($id);

            return $book ?  response()->json($book, 200) : response()->json(['error' => 'Book not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
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
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), $this->_RULES);
            if ($validator->fails()) return response()->json(['error' => $validator->errors()], 406);
            $book = Book::create($request->all());
            return response()->json($book, 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
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


    public function destroy($id)
    {
        try {
            $book = Book::find($id);
            if (!$book) return response()->json(['error' => 'Book not found'], 404);

            $book->delete();
            return response()->json(['message' => 'Book deleted'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
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
    public function update(Request $request, $id)
    {
        $rules = array_replace($this->_RULES, [
            'title' => 'required|string|max:255',
        ]); // Change validation of name field
        try {
            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) return response()->json(['error' => $validator->errors()], 406);
            $book = Book::find($id);
            if (!$book) return response()->json(['error' => 'Book not found'], 404);
            $book->update($request->all());
            return response()->json($book, 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
