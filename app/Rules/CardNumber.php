<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class CardNumber implements Rule
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
            || strlen($value) !== 16
            || !ctype_digit($value)
            || !$this->validChecksum($value)
            || !DB::table('issuers')->where('prefix', substr($value, 0, 4))->exists()
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
        return 'The :attribute must be a valid payment card number.';
    }

    /**
     * Determine if the checksum of card number is valid.
     * @see https://github.com/laravel-validation-rules/credit-card
     *
     * @param  string  $cardNumber
     * @return bool
     */
    private function validChecksum($cardNumber)
    {
        $checksum = 0;
        $len = strlen($cardNumber);
        for ($i = 2 - ($len % 2); $i <= $len; $i += 2) {
            $checksum += $cardNumber[$i - 1];
        }
        // Analyze odd digits in even length strings or even digits in odd length strings.
        for ($i = $len % 2 + 1; $i < $len; $i += 2) {
            $digit = $cardNumber[$i - 1] * 2;
            if ($digit < 10) {
                $checksum += $digit;
            } else {
                $checksum += $digit - 9;
            }
        }

        return ($checksum % 10) === 0;
    }
}
