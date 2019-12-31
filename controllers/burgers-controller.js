document.getElementById("submit-btn").addEventListener("click", event => {
    event.preventDefault();
    axios.post('/burgers', {
        name: document.getElementById("burger-name").value,
        isDevoured: "false"
    }).then(function (res) {
        console.log(res);
        document.location.reload();
    }).catch(function (err) {
        console.log(err);
    });
});
// *** SHOW BURGERS
// - if isDevoured = false, show burgers to be devoured on the left side bar
// - if isDevoured = true, show devoured burgers on the right sidebar
axios.get('/api/burgers')
    .then(function (response) {
        console.log(response);
        const leftSidebarEl = document.getElementById("left-sidebar");
        const rightSidebarEl = document.getElementById("right-sidebar");
        const rightSidebarElStr = [];
        const leftSidebarElStr = response.data.map(burger => {
            if (burger.isDevoured) {
                // show to right sidebard
                rightSidebarElStr.push(`<div class="row justify-content-md-end justify-content-sm-center">
                                            <div class="col devoured text-left">${burger.id}. ${burger.name}</div>
                                        </div>`);
            } else { // show burgers to left sidebar with 'Devour it' button
                return `<div class="row d-flex justify-content-center">
                            <div class="col-8 col-md-7 col-lg-8 burger-js text-left">${burger.id}. ${burger.name}</div>
                            <div class="col-4 col-md-5 col-lg-4">
                                <button class="btn-sm btn-warning devour-btn-js" type="button"> Devour it!</button>
                            </div>
                        </div>`;
            }
        });

        leftSidebarEl.innerHTML = leftSidebarElStr.join("\n");
        rightSidebarEl.innerHTML = rightSidebarElStr.join("\n");

        const devourBtns = document.querySelectorAll(".devour-btn-js");
        const newburgers = document.querySelectorAll(".burger-js");
        const array1 = []; // [{burgerId: '1', burgerName: "xxx", buttonEl: "btnObj" }

        for (let i = 0; i < devourBtns.length; i++) {
            array1.push({ "burgerId": newburgers[i].innerHTML.split(".")[0], "burgerName": newburgers[i].innerHTML.split(".")[1], "button": devourBtns[i]});
        }

        // add click to each save button
        for (let i = 0; i < array1.length; i++) {
            array1[i].button.addEventListener("click", function () {
                axios.post('/api/burgers', {
                    id: array1[i].burgerId,
                }).then(function (res) {
                    document.location.reload();
                    console.log("After clicked: ", res);
                }).catch(function (err) {
                    console.log(err);
                });
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    });