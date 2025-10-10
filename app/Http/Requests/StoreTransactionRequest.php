<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date' => 'required|date_format:Y-m-d',
            'category' => 'required|exists:categories,id',
            'type' => 'required|in:expense,income',
            'amount' => 'required|decimal:2|min:0|max:9999999999.99',
            'note' => 'nullable|max:255',
            'recurring_id' => 'nullable|exists:recurringRules,id',
        ];
    }
}
