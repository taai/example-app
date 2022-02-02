@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Cards</div>

                <div class="card-body">
                    <table class="table" id="cardList">
                        <thead>
                            <tr>
                                <th scope="col">Card number</th>
                                <th scope="col">Expires</th>
                                <th scope="col">Security code</th>
                                <th scope="col">Name on card</th>
                                <th scope="col">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($cards as $card)
                            <tr>
                                <td>{{ $card->card_number }}</td>
                                <td>{{ $card->expiration_month . '/' . $card->expiration_year }}</td>
                                <td>{{ $card->security_code }}</td>
                                <td>{{ $card->cardholder_name }}</td>
                                <td><button type="button" class="btn btn-danger btn-delete-card" data-id="{{ $card->id }}">delete</button></td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection