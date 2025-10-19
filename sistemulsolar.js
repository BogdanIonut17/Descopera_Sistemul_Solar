window.onload = function () {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let btn = document.getElementById("btn");
    let header = document.getElementById("inceput");
    let div = document.getElementById("container-anim");

    let dataOra = document.createElement("div");
    dataOra.style.position = "absolute";
    dataOra.style.top = "30px";
    dataOra.style.right = "30px";
    dataOra.style.fontSize = "1.2em";
    dataOra.style.fontWeight = "bold";
    dataOra.style.color = "green";
    header.appendChild(dataOra);

    function updateTime() {
        let acum = new Date();
        let formatDataOra = acum.toLocaleString("ro", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
        dataOra.textContent = formatDataOra;
    }
    setInterval(updateTime, 1000);
    updateTime();

    inceput.onclick = function () {
        header.appendChild(dataOra);
    }

    let mesajAfisat = false;
    if (div) {
        div.onclick = function (event) {
            event.stopPropagation();
            if (event.currentTarget != event.target) {
                return;
            }
            else if (!mesajAfisat) {
                let msj = document.createElement("p");
                msj.id = "mesaj";
                msj.innerHTML = "Apasă pe buton sau pe tasta Esc pentru a opri animația";
                div.appendChild(msj);
                mesajAfisat = true;
            }
        }
    }
    dataOra.onclick = function (event) {
        header.removeChild(dataOra);
        event.stopPropagation();
    }

    const stilHeader = getComputedStyle(header);
    const headerWidth = parseFloat(stilHeader.width);

    canvas.width = headerWidth;

    function drawStar(cx, cy, nr_Colturi, rExt, rInt) {
        let rotatie = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let unghi = Math.PI / nr_Colturi;

        ctx.beginPath();
        ctx.moveTo(cx, cy - rExt);

        for (let i = 0; i < nr_Colturi; i++) {
            x = cx + Math.cos(rotatie) * rExt;
            y = cy + Math.sin(rotatie) * rExt;
            ctx.lineTo(x, y);
            rotatie += unghi;

            x = cx + Math.cos(rotatie) * rInt;
            y = cy + Math.sin(rotatie) * rInt;
            ctx.lineTo(x, y);
            rotatie += unghi;
        }

        ctx.lineTo(cx, cy - rExt);
        ctx.closePath();
        ctx.fillStyle = "gold";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    function starryNight() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < 25; i++) {
            let rExt = 25;
            let rInt = rExt / 2;
            let cxRandom = Math.random() * (canvas.width - 2 * rExt) + rExt;
            let cyRandom = Math.random() * (canvas.height - 2 * rExt) + rExt;
            drawStar(cxRandom, cyRandom, 5, rExt, rInt);
        }
    }
    starryNight();
    let t;

    window.addEventListener("keyup", function (event) {
        if (event.key == 'Escape') {
            clearInterval(t);
            btn.innerHTML = "Click pentru a vedea un cer înstelat";
            let msj = document.getElementById("mesaj");
            if (msj) {
                div.removeChild(msj);
                mesajAfisat = false;
            }
        }
    });

    btn.onclick = function () {
        if (btn.innerHTML == "Click pentru a vedea un cer înstelat") {
            btn.innerHTML = "Oprește animația";
            t = setInterval(starryNight, 300);
            if (!mesajAfisat) {
                let msj = document.createElement("p");
                msj.id = "mesaj";
                msj.innerHTML = "Apasă pe buton sau pe tasta Esc pentru a opri animația";
                div.appendChild(msj);
                mesajAfisat = true;
            }
        }
        else {
            btn.innerHTML = "Click pentru a vedea un cer înstelat";
            clearInterval(t);
            let msj = document.getElementById("mesaj");
            if (msj) {
                div.removeChild(msj);
                mesajAfisat = false;
            }
        }
    }

    let sateliti = document.getElementById("container-sateliti");
    let lista = document.querySelector("select");
    if (lista) {
        lista.onchange = function () {
            let url = "http://localhost:8000/";
            sateliti.innerHTML = "";
            let planeta = lista.value;
            url += planeta + ".json";
            fetch(url)
                .then(function (response) {
                    if (response.status == "200")
                        return response.json();
                    else {
                        throw "eroare";
                    }
                })
                .then(function (date) {
                    for (let i = 0; i < date.length; i++) {
                        let fig = document.createElement("figure");
                        let foto = document.createElement("img");
                        foto.src = `${date[i].src}`;
                        foto.alt = `${date[i].nume}`;
                        fig.appendChild(foto);
                        let descr = document.createElement("figcaption");
                        descr.innerHTML = `${date[i].nume}`;
                        fig.appendChild(descr);
                        sateliti.appendChild(fig);
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
}
