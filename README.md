# Example App

This is an example app with a credit card registration form. [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) is used for credit card number validation. Card numbers must start with ```1986``` or ```2021```.

You can add:

* Register a credit card
* Create a user account
* View registered credit cards
* Delete registered credit cards

## Run Docker Hub image

Run this project from a Docker image from Docker Hub:

```bash
docker run -d -p 80:80 taai/example-app
```
