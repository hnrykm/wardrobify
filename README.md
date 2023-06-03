# Wardrobify

Team:

- Kevin Almonte - Shoes
- Henry Kim - Hats

## Design

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

## Hats microservice

Django was used for the backend of the hat microservice.
The following three files were created to complete this task.
1 - api_urls.py
Two paths were added to route the two functions in api_view.py. The first is "hats/" that uses api_list_hats to handle the GET list of hats request and POST requests to add new hats. The second is to show the details of a particular hat using a path that includes the unique id number of the hat, for example "hats/13".

2 - models.py
Two models were created for this microservice. The primary "Hats" model with a location Foreign Key. That key is used as a second model "LocationVO" and receives its data by polling from the main Wardrobe API.

3 - api_views.py
This file includes two functions and three encoders. The "api_list_hats" function handles GET requests for the list and POST requests to add a new hat. The "api_show_hats" function handles the GET, PUT, and DELETE requests. The first encoder is "HatEncoder" that is utilized by both functions and the "LocationVOEncoder" that handles the data from the LocationVO.

React was used on the frontend of the hat microservice.
The following three files were created/modified to complete this task.
1 - App.js
There was one route added ("hats") with two children routes: index and "new" to create new hat objects.

2 - HatsList.js
The HatsList method contains two functions and returns a table containing the details of each hat. The first function handles an API fetch of the data from the hats list and uses "useState" to make it an iterable array that can be mapped over in the table. The second is to delete a hat object with a DELETE request using the hat's id and reloading the page. There is a red trash can icon at the end of each row to delete a hat and the image has been modified by a CSS class for consistent height for all the hats.

3 - HatForm.js
The HatForm method contains three functions and two states (one to hold locations for the dropdown and one to handle form changes) and returns a form. The first function is to fetch the location data to be used in the dropdown list, the second is to handle changes made to the form, and the third is to handle submissions after the form has been completed. There are three fields to specify the closet_name, section_number, and shelf_number where the hat can be found. Finally, there is a successs alert when the form has been successfully submitted.

Finally, the poller.py was developed to control the polling of location data from Wardrobe to the Hats microservice. Along with the href data, three additional fields were used to create/update the data in LocationVO that would be displayed in the list table.
