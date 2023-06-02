# Wardrobify

Team:

- Kevin Almonte - Shoes
- Henry Kim - Hats

## Design

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

## Hats microservice

Django was used for the hat microservice.
The following three files were created to complete the backend.
1 - api_urls.py
Two paths were added to route the two functions in api_view.py. The first is "hats/" that uses api_list_hats to handle the GET list of hats request and POST requests to add new hats. The second is to show the details of a particular hat using a path that includes the unique id number of the hat, for example "hats/13".
2 - models.py
Two models were created for this microservice. The primary "Hats" model with a location Foreign Key. That key is used as a second model "LocationVO" and receives its data by polling from the main Wardrobe API.
3 -
