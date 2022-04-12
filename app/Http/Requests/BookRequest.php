<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BookRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'title' => [
        'required',
        'string',
        'max:255',
        Rule::unique('books')->ignore($this->book),
      ],
      'author' => 'required|string|max:255',
      'publisher' => 'required|string|max:255',
      'genre' => 'required|string|max:255',
      'price' => 'required|numeric',
    ];
  }
}
