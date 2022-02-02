@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Card registration</div>
                <div class="card-body">
                    <form class="row" id="cardForm" autocomplete="off" novalidate>
                        <div class="col-12">
                            <div class="form-floating mb-3">
                                <input type="tel" class="form-control" id="cardNumber" maxlength="16" placeholder="Card number">
                                <label for="cardNumber">Card number</label>
                                <div class="invalid-feedback" id="cardNumberInvalidFeedback"></div>
                                <p class="text-muted pt-3" id="bankName"></p>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-floating mb-3">
                                <input type="tel" class="form-control" id="cardExpires" maxlength="5" placeholder="Expires">
                                <label for="cardExpires">Expires</label>
                                <div class="invalid-feedback" id="cardExpiresInvalidFeedback"></div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-floating mb-3">
                                <input type="tel" class="form-control" id="securityCode" maxlength="3" placeholder="Security code">
                                <label for="securityCode">Security code</label>
                                <div class="invalid-feedback" id="securityCodeInvalidFeedback"></div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control text-uppercase" id="cardholderName" maxlength="26" placeholder="Name on card">
                                <label for="cardholderName">Name on card</label>
                                <div class="invalid-feedback" id="cardholderNameInvalidFeedback"></div>
                            </div>
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                    <div class="alert alert-success d-none" id="cardNotification" role="alert"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection