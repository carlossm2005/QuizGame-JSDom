const d = document;

const preguntasRespuestas = [
    {
        pregunta: "¿Qué país dió inicio a la segunda guerra mundial?",
        respuestas: [
            {
                resp: "Alemania",
                verdadero: true
            },
            {
                resp: "Unión soviética",
                verdadero: false
            },
            {
                resp: "Italia",
                verdadero: false
            }
        ]
    },
    {
        pregunta: "¿Cuál fue la capital del Imperio Bizantino?",
        respuestas: [
            {
                resp: "Roma",
                verdadero: false
            },
            {
                resp: "Budapest",
                verdadero: false
            },
            {
                resp: "Constantinopla",
                verdadero: true
            }
        ]
    },
    {
        pregunta: "¿Donde se realizó la primera detonación de una bomba atómica?",
        respuestas: [
            {
                resp: "Nuevo México",
                verdadero: true
            },
            {
                resp: "Hiroshima",
                verdadero: false
            },
            {
                resp: "Nagasaki",
                verdadero: false
            }
        ]
    },
    {
        pregunta: "¿Quién fue el primer lider de la URSS?",
        respuestas: [
            {
                resp: "Lenin",
                verdadero: true
            },
            {
                resp: "Stalin",
                verdadero: false
            },
            {
                resp: "Trotsky",
                verdadero: false
            }
        ]
    },
    {
        pregunta: "¿Cuándo ocurre la explosión del reactor de Chernobyl?",
        respuestas: [
            {
                resp: "1991",
                verdadero: false
            },
            {
                resp: "1986",
                verdadero: true
            },
            {
                resp: "1970",
                verdadero: false
            }
        ]
    }
];
let puntuacion = 0;
let turno = 0;
const nextbtn = d.querySelector(".next");
const $puntosContainer = d.querySelector(".puntuacion h1");
const $botones = d.querySelector(".botones");

function renderizado(num){
    const $pregunta = d.querySelector(".pregunta");
    let pregunta = preguntasRespuestas[num].pregunta;
    $pregunta.textContent = pregunta;
    $botones.innerHTML = ""    
    preguntasRespuestas[num].respuestas.forEach(element => {
        const $boton = d.createElement("button");
        $boton.className = "respuesta";
        $boton.dataset.respuesta = element.verdadero;
        $boton.textContent = element.resp;
        $botones.appendChild($boton);
    });
};
function siguiente(){
    nextbtn.style.display = "none";
    turno++;
    if (turno < 5) {
        renderizado(turno);
    } else{
        d.querySelector(".pregunta").innerHTML = "";
        $botones.style.alignItems = "center"
        $botones.innerHTML = 
        `
        <h1 class="puntuacion-total">Tu puntuación total fue: ${puntuacion} de 50</h1>
        <button class=again>Volver a jugar</button>
        `;
        d.querySelector(".again").style.display = "flex";
    }
};

$botones.addEventListener("click", e =>{
    nextbtn.style.display = "flex";
    if (e.target.getAttribute("data-respuesta") === "true") {
        e.target.classList.add("correcto");
        puntuacion += 10;
        $puntosContainer.textContent = "Puntuacion:" + puntuacion;   
    } else{
        $botones.querySelectorAll("button").forEach(el =>{
            if (el.getAttribute("data-respuesta") === "true") {
                el.classList.add("correcto");
            }
        });
        e.target.classList.add("incorrecto");
        puntuacion > 0 ? puntuacion -= 10 : puntuacion;
        $puntosContainer.textContent = "Puntuacion:" + puntuacion;   
    };

    $botones.querySelectorAll("button").forEach(el => el.disabled = true);
    if (e.target === d.querySelector(".again")) {
        turno = 0;
        puntuacion = 0;
        $puntosContainer.textContent =  "Puntuacion:" + puntuacion;
        $botones.style.alignItems = "stretch"
        $botones.innerHTML = "";
        nextbtn.style.display = "none";
        renderizado(0);
    };
});
renderizado(0);

