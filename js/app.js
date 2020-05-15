//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBTN =  document.getElementById('vaciar-carrito');


//Listerners

cargarEventListeners();

function cargarEventListeners(){
    //Dispara cuando se presiona "agregar Carrito"

    cursos.addEventListener('click',comprarCurso);

    //Cuando se elimina un curso del carrito

    carrito.addEventListener('click',eliminarCurso)

    //Al Vaciar el carrito

    vaciarCarritoBTN.addEventListener('click', vaciarCarrito());

    //Al cargar el documento, mostrar el local Storage

    document.addEventListener('DOMContentLoaded',leerLocalStorage);

}

//Funciones
//Funcion que añade el curso al carrito

function comprarCurso(e){
    e.preventDefault();
    //Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        //Enviamos el curso
        leerDatosCurso(curso);

    }
}

//Lee los datos del curso

function leerDatosCurso(curso){

    const infoCurso ={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        //TODO EL INFO CURSO ES UN OBJETO
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAtribute('data-id')
    }

    insertarCarrito(infoCurso);

}

//Muestra el curso seleccionado en el carrito

function insertarCarrito(curso){
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
            <img src ="${curso.imagen}">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class ="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;

    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);


}



//Elimina el curso del carrito del Dom
function eliminarCurso(e){
    e.preventDefault();

    let curso;
    let cursoID;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoID = curso.querySelector('a').getAtribute('data-id');
    }
    eliminarCursoLocalStorage(cursoID);
}


//Elimina los cursos del carrito del Dom
function vaciarCarrito(){
    //Forma lenta
    /* listaCursis.innerHTML = ''; */


    //Forma Rapida y reocmendada
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
   

    //Vaciar Local Storage
    vaciarLocalStorage();
    return false;

}

//Almacena cursos en el carrito a Local Storage

function guardarCursoLocalStorage(curso){
    let cursos;

    //Toma el valor de un arreglo cib datos de LS o vacio
    cursos = obtenerCursosLocalStorage();


    //El curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos',JSON.stringify(cursos));
}


//Comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage(){
    let cursosLs;

    //Comprobamos si hay algo en Local Storage

    if(localStorage.getItem('cursos')===null){
        cursosLs = [];
    }
    else{
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;

}

//Imprime los cursos de Local Storage en el carrito

function leerLocalStorage(){
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso) {
        //Construir el tembplate
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src ="${curso.imagen}">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class ="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        listaCursos.appendChild(row);
    });
}

//Eliminar el curso por el id en localStorage

function eliminarCursoLocalStorage(curso){
    let cursosLS;
    //Obtenemos el arreglo de cursos
    cursosLS = obtenerCursosLocalStorage();
    //Iteramos comparando el id del curso borrado con los del LS
    cursosLS.forEach(function(cursoLS,index){
        if(cursoLS.id === curso){
            cursosLS.splice(index, 1)
        }
    });

    //Añadimos el arreglo actual al del storage
    localStorage.setItem('cursos',JSON.stringify(cursosLS));
}

//Elimina todos los cursos de local Storage

function vaciarLocalStorage(){
    localStorage.clear();
}