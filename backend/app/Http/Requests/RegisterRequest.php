<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class RegisterRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role_id' => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [

            'name.required' => 'El campo nombre es obligatorio.',
            'email.required' => 'El campo email es obligatorio.',
            'email.email' => 'El campo email debe ser una dirección de correo válida.',
            'email.unique' => 'El email ya está registrado.',
            'password.required' => 'El campo contraseña es obligatorio.',
            'password.min' => 'La contraseña debe tener al menos 6 caracteres.',
            'password.confirmed' => 'La contraseña no se confirmo correctamente',
            'role_id.required' => 'El campo rol es obligatorio.',
            'role_id.numeric' => 'El campo rol debe ser un numero.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        // $errors = $validator->errors()->getMessages();
        // // Obtén el primer mensaje de error
        // $firstErrorMessage = '';
        // foreach ($errors as $fieldErrors) {
        //     if (count($fieldErrors) > 0) {
        //         $firstErrorMessage = $fieldErrors[0];
        //         break;
        //     }
        // }

        $response = response()->json([
            'message' => 'Los datos proporcionados no son válidos.',
            'errors' => $validator->errors()->first(),
        ],  Response::HTTP_UNPROCESSABLE_ENTITY);

        throw new ValidationException($validator, $response);
    }
}
