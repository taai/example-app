<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CardholderName implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (
            empty($value)
            || !is_string($value)
            || strlen($value) > 26
            || strlen($value) < 2
            || !preg_match('/^[A-Z]+([ ][A-Z]+)*[A-Z]*$/', $value)
        ) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be a valid payment card holder name.';
    }
}
