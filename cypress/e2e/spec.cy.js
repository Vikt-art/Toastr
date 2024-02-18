const testData =[
    {
        args: {
            position: 'top-right',
            title: 'test title',
            content: 'test content',
            time: '1000',
            type: 'primary'
        },
        expectedResult: {
            icon: 'email',
            title: 'test title',
            content: 'test content',
            color: 'rgb(233, 29, 99)',
            position: {
                justifyContent: 'flex-end',
                alignItems: 'flex-start'
            }
        }
    },
    {
        args: {
            position: 'top-left',
            title: 'test title',
            content: 'test content',
            time: '1000',
            type: 'success'
        },
        expectedResult: {
            icon: 'checkmark',
            title: 'test title',
            content: 'test content',
            color: 'rgb(96, 175, 32)',
            position: {
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
            }
        }
    },
    {
        args: {
            position: 'bottom-left',
            title: 'test title',
            content: 'test content',
            time: '1000',
            type: 'info'
        },
        expectedResult: {
            icon: 'question-mark',
            title: 'test title',
            content: 'test content',
            color: 'rgb(4, 149, 238)',
            position: {
                justifyContent: 'flex-start',
                alignItems: 'flex-end'
            }
        }
    },
    {
        args: {
            position: 'bottom-right',
            title: 'test title',
            content: 'test content',
            time: '1000',
            type: 'warning'
        },
        expectedResult: {
            icon: 'alert-triangle',
            title: 'test title',
            content: 'test content',
            color: 'rgb(255, 190, 67)',
            position: {
                justifyContent: 'flex-end',
                alignItems: 'flex-end'
            }
        }
    }
];



beforeEach('Test Toastr',() => {
    cy.visit('https://sanitarskyi-ngx-admin.herokuapp.com/');
  cy.get('[alt="Material Dark Theme"]').click();
  cy.get('a[title="Modal & Overlays"]').click();
  cy.get('a[title="Toastr"]').click();
})



testData.forEach(({args, expectedResult }) => {
  it(`Toastr test position ${args.position}, type ${args.type}`, () => {

    cy.get('div.col-md-6.col-sm-12 button.select-button').eq(0).click();
    cy.get(`nb-option[ng-reflect-value ='${args.position}']`);
    cy.get('[ng-reflect-name = "title"]').clear();
    cy.get(`[ng-reflect-name = "title"]`).type(args.title);
    cy.get(`[ng-reflect-name = "content"]`).clear();
    cy.get('[ng-reflect-name = "title"]').type(args.content);
    cy.get('[ng-reflect-name = "timeout"]').clear();
    cy.get('[ng-reflect-name = "timeout"]').type(args.time);
    cy.get('div.col-md-6.col-sm-12 button.select-button').eq(1).click();
    cy.get(`nb-option[ng-reflect-value ='${args.position}']`).click();
    cy.contains('button','Show Toast').click();
    cy.wait(500);

    cy.get ('nb-toast[ng-reflect-toast]').then(toast =>{
        cy.wrap(toast).should("contain",expectedResult.title)
            .and ("contain",expectedResult.content)
            .and("have.css",'background-color')
            .and("eq",expectedResult.color)

        cy.wrap(toast).find(`g[data-name="${expectedResult.icon}"]`).should('exist');

        cy.wrap(toast).parents(` .toastr-overlay-container cdk-global-overlay-wrapper`).should("have.css",'justify-content').and("eq",expectedResult.position.justifyContent);
        cy.wrap(toast).parents(` .toastr-overlay-container cdk-global-overlay-wrapper`).should("have.css",'align-items').and("eq",expectedResult.position.alignItems);


    })

  })
})
