window.onload = function () {
    let form = document.getElementById("form");
    let user = document.getElementById("user");
    let parola = document.getElementById("parola");
    let mesaj = document.getElementById("welcome");
    let eroare = document.getElementById("eroare");
    let logout = document.getElementById("logout");
    let username = document.getElementById("username");
    let planetePref = document.getElementById("planete-pref");
    let modifica = document.getElementById("modif");
    let salveaza = document.getElementById("salveaza");
    let sterge = document.getElementById("sterge");
    let listaPlanete = document.getElementById("planete");

    function showPreferredPlanets() {
        let userLogat = localStorage.getItem("username");
        if (userLogat) {
            let planeteUser = JSON.parse(localStorage.getItem(`planeteSelectate_${userLogat}`)) || [];
            planetePref.textContent = planeteUser.length > 0
                ? `Planete preferate: ${planeteUser.join(", ")}`
                : "Nu aveți nicio planetă preferată selectată.";
        }
    }

    function checkStatus() {
        let userLogat = localStorage.getItem("username");
        if (userLogat) {
            mesaj.style.display = "block";
            username.textContent = userLogat;
            form.style.display = "none";
            logout.style.display = "block";
            eroare.style.display = "none";
            planetePref.style.display = "block";
            modifica.style.display = "block";
            salveaza.style.display = "none";
            sterge.style.display = "none";
            listaPlanete.style.display = "none";
            showPreferredPlanets();
        } else {
            mesaj.style.display = "none";
            form.style.display = "block";
            logout.style.display = "none";
            eroare.style.display = "block";
            planetePref.style.display = "none";
            modifica.style.display = "none";
            sterge.style.display = "none";
            listaPlanete.style.display = "none";
        }
    }
    checkStatus();

    function validUser(user) {
        let u = /^[a-zA-Z][a-zA-Z0-9_]{2,}$/;
        return u.test(user);
    }

    function validParola(parola) {
        let p = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[?!$%&#@_]).{5,}$/;
        return p.test(parola);
    }

    function checkUser(user, parola) {
        let useri = [
            { nume: "Bogdan", parola: "Bogdan_17" },
            { nume: "Andrei", parola: "Andrei_29" },
            { nume: "Ionut", parola: "Ionut_05" },
            { nume: "Alex", parola: "Alex_14" }
        ];
        for (let u of useri) {
            if ((u.nume == user) && (u.parola == parola)) return true;
        }
        return false;
    }

    user.onchange = function () {
        let userValue = user.value;
        eroare.textContent = "";
        if (!validUser(userValue)) {
            eroare.textContent = "Utilizator invalid";
        }
    }
    parola.onchange = function () {
        let parolaValue = parola.value;
        eroare.textContent = "";
        if (!validParola(parolaValue)) {
            eroare.textContent = "Parolă invalidă";
        }
    }

    form.onsubmit = function (event) {
        event.preventDefault();
        eroare.textContent = "";
        let usernameValue = user.value;
        let password = parola.value;
        if (checkUser(usernameValue, password)) {
            localStorage.setItem("username", usernameValue);
            location.href = "index.html";
        } else {
            eroare.textContent = "Datele de logare sunt invalide";
        }
    }

    logout.onclick = function () {
        localStorage.removeItem("username");
        checkStatus();
    }

    let planete = listaPlanete.getElementsByTagName("li");
    for (let planeta of planete) {
        let numePlaneta = planeta.textContent;
        planeta.setAttribute("nume", numePlaneta);
    }

    function loadSelections() {
        let userLogat = localStorage.getItem("username");
        if (userLogat) {
            let planeteUser = JSON.parse(localStorage.getItem(`planeteSelectate_${userLogat}`)) || [];
            planeteUser.forEach(el => {
                let planeta = document.querySelector(`[nume="${el}"]`);
                if (planeta) {
                    planeta.classList.add("selectat");
                }
            });
        }
    }

    function resetPlanetsText() {
        let planete = listaPlanete.getElementsByTagName("li");
        for (let planeta of planete) {
            let textOriginal = planeta.getAttribute("nume");
            planeta.textContent = textOriginal;
        }
    }

    modifica.onclick = function () {
        listaPlanete.style.display = listaPlanete.style.display == "none" ? "block" : "none";
        salveaza.style.display = salveaza.style.display == "none" ? "block" : "none";
        sterge.style.display = sterge.style.display == "none" ? "block" : "none";
        resetPlanetsText();
    }

    listaPlanete.onclick = function (event) {
        let target = event.target;
        if (target.tagName == "LI") {
            target.classList.toggle("selectat");
            let textOriginal = target.getAttribute("nume");
            target.textContent = target.classList.contains("selectat")
                ? textOriginal.toUpperCase()
                : textOriginal;
        }
    }

    salveaza.onclick = function () {
        let userLogat = localStorage.getItem("username");
        if (userLogat) {
            let selectate = document.getElementsByClassName("selectat");
            let planeteSelectate = Array.from(selectate).map(el => el.getAttribute("nume"));
            localStorage.setItem(`planeteSelectate_${userLogat}`, JSON.stringify(planeteSelectate));
            showPreferredPlanets();
            salveaza.style.display = "none";
            sterge.style.display = "none";
            listaPlanete.style.display = "none";
        }
    }

    sterge.onclick = function () {
        let userLogat = localStorage.getItem("username");
        if (userLogat) {
            localStorage.removeItem(`planeteSelectate_${userLogat}`);
            document.querySelectorAll(".selectat").forEach(el => {
                el.classList.remove("selectat");
                let numePlaneta = el.getAttribute("nume");
                el.textContent = numePlaneta;
            });
            showPreferredPlanets();
        }
    }

    loadSelections();
}
