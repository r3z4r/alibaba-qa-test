// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add(
	"search",
	(origin, destination, DepartFromToday = 0, returnFromToday = null) => {
		cy.get("[data-test=originPicker]").type(`${origin}{enter}`);
		cy.get("[data-test=destinationPicker]").type(`${destination}{enter}`);
		cy.get("[data-test=departingDatePicker]").click();
		cy.get(".calendar__day:not(.before)").then(nextDays => {
			nextDays[DepartFromToday].click();
			if (returnFromToday) {
				nextDays[returnFromToday].click();
			}
		});
	}
);
