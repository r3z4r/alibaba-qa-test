context("Navigate to contact page", () => {
	it("Scroll to bottom and navigate to contact page", () => {
		cy.visit("/");
		cy.scrollTo("bottomRight", {
			timeout: 10000,
			duration: 6000,
		});
		cy.get("li.site-footer__item a[href='/contact-us']").click();
		cy.url().should("contain", "contact-us");
	});
});
