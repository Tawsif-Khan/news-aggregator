<?php

namespace App\Http\Requests\News;

use Illuminate\Foundation\Http\FormRequest;

class Search extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'keyword' => 'string|required',
            'source' => 'string|nullable',
            'category' => 'string|nullable',
            'fromDate' => 'date|date_format:Y-m-d|nullable',
            'toDate' => 'date|date_format:Y-m-d|after_or_equal:fromDate|nullable'
        ];
    }

    //validation messages
    public function messages()
    {
        return [
            'fromDate.date_format' => 'From date must be in Y-m-d format',
            'toDate.date_format' => 'To date must be in Y-m-d format',
            'toDate.after_or_equal' => 'From date must be before or equal to To date'
        ];
    }
}
