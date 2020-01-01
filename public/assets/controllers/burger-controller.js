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
    devourIt(); // enable click event of the button "Devour it" right after a new burger is added
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
                                            <div class="col devoured text-left">${burger.id}. ${burger.name}</div>
                                        </div>`);
        } else { // show burgers to left sidebar with 'Devour it' button
            return `<div class="row d-flex justify-content-center">
                            <div class="col-8 col-md-7 col-lg-8 burger-js text-left">${burger.id}. ${burger.name}</div>
                            <div class="col-4 col-md-5 col-lg-4">
                                <button class="btn-sm btn-warning devour-btn-js" type="submit"> Devour it!</button>
                            </div>
                        </div>`;
        }
    });
    // renders content
    leftSidebarEl.innerHTML = leftSidebarElStr.join("\n");
    rightSidebarEl.innerHTML = rightSidebarElStr.join("\n");

    // creates object to store the mapping of 'Devour it' button elements and new burger elements
    const devourBtnEls = document.querySelectorAll(".devour-btn-js");
    const burgerEls =  document.querySelectorAll(".burger-js");
    const devourObj = { devourBtns: devourBtnEls, burgers: burgerEls };
    return devourObj;
}

// *** Function that maps the 'Devour it' buttons and their respective burger elements (div).
// The function returns an array containing the following objects: 'Devour it' buttons and new burger elements
// ===========================================================================================================
async function mapDevourBtnsAndBurgers() {
    const devourObj = await renderContent();
    const devourBtns = devourObj.devourBtns;
    const newBurgers = devourObj.burgers;
    // Create an array to map the new burgers and their respective 'Devour it' buttons.
    // The array structure should be: [{burgerId: '1', burgerName: "xxx", buttonEl: "btnObj" }]
    const toDevourArr = []; 
    for (let i = 0; i < devourBtns.length; i++) {
        toDevourArr.push({ "burgerId": newBurgers[i].innerHTML.split(".")[0], "burgerName": newBurgers[i].innerHTML.split(".")[1], "button": devourBtns[i] });
        // *** Note: By splitting the array newBurgers at the dot "." sign then get item before dot for 'burger Id' and item after the dot for burger's name.
    }
    return toDevourArr;
}

// *** Function that handles click event when users click each "Devour it" button
// ================================================================
async function devourIt(){
    let toDevourArr = await mapDevourBtnsAndBurgers();
    for (let i = 0; i < toDevourArr.length; i++) {
        toDevourArr[i].button.addEventListener("click", async function () {
            axios.post('/api/burgers', {
                id: toDevourArr[i].burgerId,
            }).then(function (res) {
                renderContent(); // moves the devoured burger to the right sidebar and updates database
                devourIt(); // refresh the array toDevourArr with the remaining "devour it" button elements and the elements of new-burger div
            }).catch(function (err) {
                console.log(err);
            });   
        });  
    }
}
devourIt();