const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    //Captura el click cuando queremos agregar un producto al carrito
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso)

    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [] // resetea el array de productos 
        reiniciarHTML() // elimina lo que tengamos en el HTML del carrito

    }
    
    )
}


//Funcion que nos permite cargar el producto al carrito
function agregarCurso(e){
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')){
       const cursoSeleccionado = e.target.parentElement.parentElement;
       leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        carritoHTML()
    }
}

//Funcion que obtiene la informacion del producto que se va a cargar en el carrito
function leerDatosCurso(curso) {
   // console.log(curso);

    //Se crea objeto con los datos del producto que vamos a cargar en el carrito
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    //Se revisa si un producto ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)

    if (existe){
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id){
                curso.cantidad++;
                return curso // retorna el objeto con la cantidad acumulada
            }
            else{
                return curso // retorna los objetos que no son duplicados
            }
        })
        articulosCarrito = [...cursos]
    }
    else{
        //Agregar elementos al array del Carrito
        articulosCarrito = [...articulosCarrito, infoCurso]

    }
    
    console.log(articulosCarrito)

    carritoHTML()
}

function carritoHTML(){

    //reiniciar HTML
    reiniciarHTML()

    //recorre los articulos seleccionados y los carga al carrito
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr')
        row.innerHTML= `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                ${curso.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}" > X </a>
            </td>
        `
        
        contenedorCarrito.appendChild(row)
        
    })

}

function reiniciarHTML(){
//Mientras haya un elementos en el carrito va eliminando desde el primero
while (contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}