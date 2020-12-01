describe("Ticket search", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("Query Today's tickets oneway (E2E)", () => {
		cy.search("تهران", "مشهد");
		cy
			.intercept(
				"GET",
				"https://ws.alibaba.ir/api/v1/flights/domestic/available/*"
			)
			.as("query");
		cy.get("[data-test=search]").click();
		cy.wait("@query", {timeout: 60000}).should(({response}) => {
			expect(response.body.success, "successful query").to.equal(true);
			cy.get(".isCompleted").as("result");
			if (response.body.result.departing.length === 0) {
				cy.log("no result");
				cy.get("@result").should("have.class", "empty");
			} else {
				cy.get("@result").should("not.have.class", "empty");
			}
		});
	});

	it("Query tickets (Error handling)", () => {
		cy.search("تهران", "مشهد");
		cy
			.intercept(
				"GET",
				"https://ws.alibaba.ir/api/v1/flights/domestic/available/*",
				{error: true}
			)
			.as("query");
		cy.get("[data-test=search]").click();
		cy.wait("@query", {timeout: 60000});
		cy.get(".alert").should("be.visible");
	});

	it("Query tickets (No result handling)", () => {
		cy.search("تهران", "مشهد");
		cy
			.intercept(
				"GET",
				"https://ws.alibaba.ir/api/v1/flights/domestic/available/*",
				req => {
					req.reply(res => {
						res.send({fixture: "emptyResponse.json"});
					});
				}
			)
			.as("query");
		cy.get("[data-test=search]").click();
		cy.wait("@query", {timeout: 60000});
		cy.get(".not-found-hero").should("be.visible");
	});

	it("Query tickets (Fixture)", () => {
		cy.fixture("validResponses.json").as("flights");
		cy.get("@flights").then(item => {
			cy.search(item.origin, item.destination, 1);
			cy
				.intercept(
					"GET",
					"https://ws.alibaba.ir/api/v1/flights/domestic/available/*",
					req => {
						req.reply(res => {
							res.send(item.response);
						});
					}
				)
				.as("query");
			cy.get("[data-test=search]").click();
			cy.wait("@query", {timeout: 60000});
			cy
				.get(".available-columns")
				.should("have.length", item.response.result.departing.length)
				.each($elm => {
					cy.wrap($elm).within(() => {
						cy.get(".from").should("have.text", item.origin);
						cy.get(".to").should("have.text", item.destination);
					});
				});
		});
	});
});
