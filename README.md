# 🌠 Descoperă Sistemul Solar

Site informativ ce cuprinde o prezentare a principalelor corpuri din Sistemului Solar, cu imagini și detalii despre Soare, planete și sateliți.
Proiectul este realizat folosind `HTML` și `CSS`, cu elemente interactive în `JavaScript`.  

---

## 🪐 Funcționalități
- Prezentare interactivă a planetelor cu descrieri și imagini;  
- Animație care simulează un cer înstelat;
- Interfață modernă, responsive, realizată în `CSS`;
- Sesiuni login + logout folosind conturi prestabilite, memorate în `localStorage`;
- Cereri `AJAX` cu preluare date din fișier `JSON`.

---

### Conturi
- Nume utilizator: Bogdan
- Parolă: Bogdan_17
---
- Nume utilizator: Andrei
- Parolă: Andrei_29
---     
- Nume utilizator: Alex
- Parolă: Alex_14
---
- Nume utilizator: Ionut
- Parolă: Ionut_05

---

## 🧰 Tehnologii utilizate
- **HTML5** – structurarea conținutului  
- **CSS3** – stilizare și layout responsive  
- **JavaScript (ES6+)** – logica interactivă și animația principală  
- **Canvas API** – utilizarea elementului `<canvas>` pentru randarea și desenarea elementelor grafice 2D
- **AJAX (XMLHttpRequest / Fetch API)** - cereri de imagini către un server local și preluarea datelor din fișiere
- **JSON** – format pentru stocarea datelor despre sateliți.  

---

## 🚀 Accesează site-ul online
Poți vizita versiunea statică a proiectului (fără AJAX) aici:
👉 **[Descoperă Sistemul Solar](https://bogdanionut17.github.io/Descopera_Sistemul_Solar/pagini/index.html)**

> ⚠️ Imaginile cu sateliții nu vor apărea pe GitHub Pages, deoarece `AJAX` necesită rularea fișierului `JSON` printr-un server local (nu se poate accesa direct din sistemul de fișiere sau din GitHub Pages).

---

## 💻 Rulare locală cu server

Pentru a accesa complet toate funcționalitățile (inclusiv galeria dinamică):

Pasul 1️⃣: Clonează repository-ul
   ```bash
   git clone https://github.com/bogdanionut17/Descopera_Sistemul_Solar.git
   cd Descopera_Sistemul_Solar
   ```

Pasul 2️⃣: Pornește un server local Pornește un server local cu **Python 3**:
   ```bash
   python -m http.server 8000
   ```
     
Pasul 3️⃣: Accesează site-ul în browser
👉   **[Descoperă Sistemul Solar](http://localhost:8000/pagini/index.html)**
- Galeria de imagini și cererile AJAX vor funcționa corect, preluând datele din fișierele `JSON`, și se vor afișa imaginile cu sateliții planetei alese din listă.
    
## 📘 Exemplu de fișier JSON
Datele pentru fiecare planetă sunt stocate într-un fișier `JSON` separat, care conține lista sateliților săi.
Fiecare element include:

src – calea relativă către imaginea satelitului

nume – denumirea satelitului

Exemplu: jupiter.json

```json
[
    {
        "src": "../imagini/io.jpg",
        "nume": "Io"
    },
    {
        "src": "../imagini/europa.jpg",
        "nume": "Europa"
    },
    {
        "src": "../imagini/ganymede.jpg",
        "nume": "Ganymede"
    },
    {
        "src": "../imagini/callisto.jpg",
        "nume": "Callisto"
    }
]
```
