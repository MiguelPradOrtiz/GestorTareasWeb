const formulario = document.getElementById("form-tarea");
const entrada = document.getElementById("nueva-tarea");
const lista = document.getElementById("lista-tareas");
const mensajeVacio = document.getElementById("mensaje-vacio");

const totalTareas = document.getElementById("total-tareas");
const pendientes = document.getElementById("pendientes");
const completadas = document.getElementById("completadas");
const botonesFiltro = document.querySelectorAll(".filtro");

const CLAVE = "gestor_tareas_uveg";

let tareas = JSON.parse(localStorage.getItem(CLAVE) || "[]");
let filtroActual = "todas";

function guardarTareas() {
    localStorage.setItem(CLAVE, JSON.stringify(tareas));
}

function actualizarEstadisticas() {
    totalTareas.textContent = tareas.length;

    pendientes.textContent = tareas.filter(
        tarea => !tarea.completada
    ).length;

    completadas.textContent = tareas.filter(
        tarea => tarea.completada
    ).length;
}


function mostrarTareas() {
    lista.innerHTML = "";

    const filtradas = tareas.filter(tarea => {
        if (filtroActual === "pendientes") {
            return !tarea.completada;
        }

        if (filtroActual === "completadas") {
            return tarea.completada;
        }

        return true;
    });

    mensajeVacio.style.display =
        filtradas.length === 0 ? "block" : "none";

    filtradas.forEach(tarea => {
        const elemento = document.createElement("li");
        elemento.className = "tarea";

        if (tarea.completada) {
            elemento.classList.add("completada");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada;
        checkbox.setAttribute(
            "aria-label",
            "Marcar tarea como completada"
        );

        checkbox.addEventListener("change", () => {
            tarea.completada = checkbox.checked;
            guardarTareas();
            mostrarTareas();
        });

        const texto = document.createElement("span");
        texto.className = "texto-tarea";
        texto.textContent = tarea.texto;

        const eliminar = document.createElement("button");
        eliminar.className = "eliminar";
        eliminar.textContent = "Eliminar";

        eliminar.addEventListener("click", () => {
            tareas = tareas.filter(t => t.id !== tarea.id);
            guardarTareas();
            mostrarTareas();
        });

        elemento.append(checkbox, texto, eliminar);
        lista.appendChild(elemento);
    });

    actualizarEstadisticas();
}

formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    const texto = entrada.value.trim();

    if (texto === "") {
        return;
    }

    const nuevaTarea = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        texto: texto,
        completada: false
    };

    tareas.push(nuevaTarea);

    guardarTareas();
    mostrarTareas();

    formulario.reset();
    entrada.focus();
});

botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
        filtroActual = boton.dataset.filtro;

        botonesFiltro.forEach(b => {
            b.classList.remove("activo");
        });

        boton.classList.add("activo");
        mostrarTareas();
    });
});

mostrarTareas();
