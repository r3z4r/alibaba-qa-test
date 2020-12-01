# alibaba.ir cypress quize

## Installation
`npm i`

<hr>

## Runing
In the project directory, you can run:

#### `npm test`
Launches cypress in the UI mode.

#### `npm run cy:run`
run tests in headless mode and video file created in the corresponding video folder.

<hr>

## Custom Cypress Commands
* `cy.search(origin, destination, DepartIndexFromToday, returnIndx)`

    search tickets from origin city to destinition city

    Input | Type | Default | description
    ------------ | ------------- | ------------- | -------------
    origin | string | - | origin city , should be a valid city
    destination | string | - | destination city , should be a valid city
    departing day | int | today | index of departing day from today, *ex. index for tomorrow is 1*
    returning day | int | no entry (one way) | index of departing day from today, *ex. index for the day after tomorrow is 2*

