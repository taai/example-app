<?php

namespace App\Http\Requests;

use App\Rules\CardholderName;
use App\Rules\CardNumber;
use Illuminate\Foundation\Http\FormRequest;

class StoreCardRequest extends FormRequest
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
            'card_number' => ['required', new CardNumber, 'unique:cards,card_number'],
            'expiration_month' => 'required|string|digits:2',
            'expiration_year' => 'required|string|digits:2',
            'security_code' => 'required|string|digits:3',
            'cardholder_name' => ['required', new CardholderName], // ISO/IEC 7813
        ];
    }
}
