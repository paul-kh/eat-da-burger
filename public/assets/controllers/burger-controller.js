// *** Function that allows users to add new burger name to database
// =================================================================
function addBurger() {
    const burgerEl = document.getElementById("burger-name");
    // if users submit a blank burger name, show users a message as placehold in the textarea and set focus on the textarea
    if (burgerEl.value === "") {
        burgerEl.setAttribute("placeholder", "Please enter a burger name...");
        burgerEl.focus();
    } else { // sends new burger name to be inserted into the database
        axios.post('/burgers', {
            name: burgerEl.value,
            isDevoured: "false"
        }).then(function (res) {
            // clear textarea and set focus
            burgerEl.value = "";
            burgerEl.focus();

        }).catch(function (err) {
            console.log(err);
        });
    }
}

// *** Add 'click' event when users click submit button to add a new burger name
// =============================================================================
document.getElementById("submit-btn").addEventListener("click", event => {
    addBurger();
    renderContent();

    // enable click event of the button "Devour it" right after a new burger is added
});

// *** Function that request burger data from the server/database.
//     The function return burger data received from the server.
// =========================================================================
async function getBurgerData() {
    const burgers = await axios.get('/api/burgers')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    return burgers;
}

// *** Function that renders content and return an object containing 2 arrays: 
//      1). 'Devour it' button elements, and 2). New burger elements (div).
// =============================================================================
async function renderContent() {
    const burgers = await getBurgerData();
    const leftSidebarEl = document.getElementById("left-sidebar");
    const rightSidebarEl = document.getElementById("right-sidebar");
    const rightSidebarElStr = [];
    const leftSidebarElStr = burgers.map(burger => {
        if (burger.isDevoured) {
            // show to right sidebard
            rightSidebarElStr.push(`<div class="row justify-content-md-end justify-content-sm-center">
                                            <div class="col devoured text-left">
                                            <span> ${burger.id}. ${burger.name} </span>
                                            <span style="text-align: right">
                                                <button id="${burger.id}" class="btn-sm btn-danger delete-btn-js" type="submit"> Delete</button>
                                            </span>
                                            </div>
                                        </div>`);
        } else { // show burgers to left sidebar with 'Devour it' button
            return `<div class="row d-flex justify-content-center">
                            <div class="col-8 col-md-7 col-lg-8 burger-js text-left">${burger.id}. ${burger.name}</div>
                            <div class="col-4 col-md-5 col-lg-4">
                                <button id="${burger.id}" class="btn-sm btn-warning devour-btn-js" type="submit"> Devour it!</button>
                            </div>
                        </div>`;
        }
    });
    // renders content
    leftSidebarEl.innerHTML = leftSidebarElStr.join("\n");
    rightSidebarEl.innerHTML = rightSidebarElStr.join("\n");

    // Create Devour Buttons and add click event
    const devourBtnEls = document.querySelectorAll(".devour-btn-js");
    console.log("DevourButtons: ", devourBtnEls);
    for (let i = 0; i < devourBtnEls.length; i++) {
        devourBtnEls[i].addEventListener("click", ({ target }) => {
            axios.post('/api/burgers', {
                id: target.id,
            }).then(function (res) {
                renderContent(); // moves the devoured burger to the right sidebar and updates database
            }).catch(function (err) {
                console.log(err);
            });
        });
    }
}

renderContent();