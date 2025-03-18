const drawings = [
    { id: 1, img: "7900573.jpg", nameImg: "חתול ברקע פרחים" },
    { id: 2, img: "7905143.jpg", nameImg: "פרחים ושמש" },
    { id: 3, img: "8437993.jpg", nameImg: "ארנב עם גזרים" },
    { id: 4, img: "7954248.jpg", nameImg: "קיץ" },
    { id: 5, img: "6726152.jpg", nameImg: "דבורה" },
    { id: 5, img: "פיל.jpg", nameImg: "פיל מתיז מים" },
    { id: 5, img: "צב.jpg", nameImg: "צב עם ציפור על גבו" },
    { id: 5, img: "כלב.jpg", nameImg: "כלבלב חמוד" },
    { id: 6, img: "6716178.jpg", nameImg: "חתול ועכבר" },
    { id: 7, img: "6751969.jpg", nameImg: "דוב עם דבש" },
    { id: 8, img: "22821470_6706881.jpg", nameImg: "סוס צוהל" },
    { id: 9, img: "23441670_6803514.jpg", nameImg: "פיל שמח" },
]

// --------login&register------

function login(event) {

    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    let users = localStorage.getItem("users");
    if (users == null)
        users = [];
    else
        users = JSON.parse(users);

    const user = users.find(u => u.username == username && u.password == password);

    if (user === undefined)
        alert("אחד הפרטים שגויים");
    else {
        alert("שלום ל- " + user.username);

        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.username);


        const loginForm = document.getElementById("login");
        loginForm.style.display = "none";
        if (user.role === "admin") {
            document.getElementById("contact").style.display = "none";
            document.getElementById("requests_link").style.display = "inline";
        }
        else {
            document.getElementById("contact").style.display = "inline";
            document.getElementById("requests_link").style.display = "none";
        }

        const homePage = document.getElementById("allBody");
        homePage.style.opacity = 1;
        renderMyDrawings();

    }
}

function register(event) {

    event.preventDefault();

    let users = localStorage.getItem("users");
    if (users == null)
        users = [];
    else
        users = JSON.parse(users);

    const id = users.length + 1;
    const username = event.target.username.value;

    const userName = users.find(u => u.username == username);

    if (userName != undefined)
        alert("שם משתמש זה כבר קיים, בחר שם אחר");
    else {
        const password = event.target.password.value;
        const email = event.target.email.value;
        const roleSelect = document.querySelector('select[name="role"]');
        const selectedRole = roleSelect.value;        
        const addUser = { id, username, password, email, role: selectedRole, myDrawings: [] };
        users.push(addUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("נרשמת בהצלחה:)");
        alert("שלום ל- " +username);


        localStorage.setItem("userId", id);
        localStorage.setItem("userName", username);
        const register = document.getElementById("register");
        register.style.display = "none";
        if (selectedRole === "admin") {
            document.getElementById("contact").style.display = "none";
            document.getElementById("requests_link").style.display = "inline";
        }
        else {
            document.getElementById("contact").style.display = "inline";
            document.getElementById("requests_link").style.display = "none";
        }
        const homePage = document.getElementById("allBody");
        homePage.style.opacity = 1;
        renderMyDrawings();
    }

}

function openRegister() {
    const register = document.getElementById("register");
    register.style.display = "block";
    const login = document.getElementById("login");
    login.style.display = "none";
}

function showElement(elementId) {
    const elements = document.getElementsByClassName("divMain");
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].id != elementId)
            elements[i].style.display = "none";
        else
            elements[i].style.display = "flex";

    }
    if (elementId === "container_drawings")
        renderDrawings();

    else if (elementId === "container_requests")
        renderRequests();

    else if (elementId === "myDrawings")
        renderMyDrawings();
}


// ------- drawings ------

function searchDrawings() {

    const searchInput = document.getElementById("searchInput").value;
    const filteredDrawings = drawings.filter(drawing => drawing.nameImg.includes(searchInput));
    
    const drawingsDiv = document.getElementById("container_drawings");
    drawingsDiv.innerHTML = "";

    for (let i = 0; i < filteredDrawings.length; i++) {
        const element = `<div class="card">
        <img src="images/${filteredDrawings[i].img}">
        <h3>${filteredDrawings[i].nameImg}</h3>
        <button onclick="addToCart(${drawings[i].id})">הוספה למאגר שלי:)</button>
        </div>`;
        drawingsDiv.innerHTML += element;
    };
}

function renderDrawings() {
    const drawingsDiv = document.getElementById("container_drawings");
    drawingsDiv.innerHTML = " ";
    for (let i = 0; i < drawings.length; i++) {
        const element = `<div class="card">
        <img src="images/${drawings[i].img}">
        <h3>${drawings[i].nameImg}</h3>
        <button onclick="addToCart(${drawings[i].id})">הוספה למאגר שלי:)</button>
        </div>`;
        drawingsDiv.innerHTML += element;
    }
}

// -------my drawings ------


function addToCart(drawingsId) {

    let userId = localStorage.getItem("userId");
    userId = JSON.parse(userId);

    let users = localStorage.getItem("users");
    users = JSON.parse(users);

    const userIndex = users.findIndex(user => user.id === userId);

    const myDrawings = users[userIndex].myDrawings;
    const item = myDrawings.find(x => x.id === drawingsId);
    if (item != null)
        alert("הציור כבר נמצא במאגר שלך");

    else {
        const drawingToAdd = drawings.find(drawing => drawing.id === drawingsId);
        users[userIndex].myDrawings.push(drawingToAdd);
        alert(" הפריט נוסף למאגר האישי שלך! במאגרך קיימים " + (users[userIndex].myDrawings.length) + " ציורים ");
        localStorage.setItem("users", JSON.stringify(users));
        renderMyDrawings();
    }
}


function renderMyDrawings() {

    let userId = localStorage.getItem("userId");
    userId = JSON.parse(userId);


    let users = localStorage.getItem("users");
    users = JSON.parse(users);

    const userIndex = users.findIndex(user => user.id === userId);

    let myDrawings = users[userIndex].myDrawings;

    const cartDiv = document.getElementById("myDrawings");
    cartDiv.innerHTML = "";

    if (myDrawings.length === 0) {
        cartDiv.innerHTML = "<p>המאגר שלך ריק</p>";

    } else {
        cartDiv.innerHTML = "<h2>האוסף שלי:)</h2>";

        for (let i = 0; i < myDrawings.length; i++) {
            const element = `<div class="myDraw" >
            
                        <img id="myDraw_${myDrawings[i].id}" src="images/${myDrawings[i].img}" >
                        <div class="drawDetails">
                            <h3>${myDrawings[i].nameImg}</h3>
                            <button onclick="removeFromCart(${myDrawings[i].id})">מחיקה</button>
                            <button onclick="printImage(${myDrawings[i].id})">הדפסה</button>
                        </div>
                    </div>`;
            cartDiv.innerHTML += element;
        }
    }
}

function removeFromCart(drawingsId) {


    let userId = localStorage.getItem("userId");
    userId = JSON.parse(userId);

    let users = localStorage.getItem("users");
    users = JSON.parse(users);

    const userIndex = users.findIndex(user => user.id === userId);

    let myDrawings = users[userIndex].myDrawings;

    const updatedCartItems = myDrawings.filter(item => item.id !== drawingsId);
    users[userIndex].myDrawings = updatedCartItems;

    localStorage.setItem("users", JSON.stringify(users));

    renderMyDrawings();
}

function printImage(drawingsId) {
    let userId = localStorage.getItem("userId");
    userId = JSON.parse(userId);

    let users = localStorage.getItem("users");
    users = JSON.parse(users);

    const userIndex = users.findIndex(user => user.id === userId);

    let myDrawings = users[userIndex].myDrawings;

    const item = myDrawings.find(item => item.id === drawingsId);

    const formPrint = document.getElementById("printer");
    formPrint.innerHTML = "";
    formPrint.innerHTML = `<img id="printMyImg" src="images/${item.img}" alt="">`;
    formPrint.style.display = "block";
    formPrint.style.zIndex = 2;
    window.print(formPrint);
    formPrint.style.display = "none";
}



// ----------requets--------

function addRequest(event) {
    event.preventDefault();
    const username = localStorage.getItem("userName");
    alert(username);
    let Requests = localStorage.getItem("Requests");
    if (Requests == null)
        Requests = [];
    else
        Requests = JSON.parse(Requests);

    const item = { id: Requests.length, username: username, content: event.target.request.value };

    Requests.push(item);
    localStorage.setItem("Requests", JSON.stringify(Requests));
    alert("בקשתך נשלחה בהצלחה");

    requestContent = document.getElementById("requestContent");
    requestContent.value = "";
}

function renderRequests() {
    let Requests = localStorage.getItem("Requests");
    if (Requests == null)
        Requests = [];
    else
        Requests = JSON.parse(Requests);
    const RequestsDiv = document.getElementById("container_requests");
    RequestsDiv.innerHTML = "";

    if (Requests.length === 0)
        RequestsDiv.innerHTML = "<p>אין בקשות</p>";

    else {

        for (let i = 0; i < Requests.length; i++) {
            const element = `<div class="cardRequests">
                        <h3>${Requests[i].username}:  ${Requests[i].content}</h3>
                        <button onclick="deleteRequests(${Requests[i].id})">הסר</button>
                        </div>`;
            RequestsDiv.innerHTML += element;
        }
    }
}

function deleteRequests(requestId) {
    let Requests = localStorage.getItem("Requests");
    Requests = JSON.parse(Requests);

    const updatedRequests = Requests.filter(item => item.id !== requestId);

    localStorage.setItem("Requests", JSON.stringify(updatedRequests));

    renderRequests();
}
