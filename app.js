//funcion para mostrar el formulario de registro (Inicio)
function mostrarFormulario() {
    // Ocultar la tabla de registros y el formulario de procedimiento
    document.getElementById('tabla-registros').style.display = 'none';
    document.getElementById('tabla-procedimentos').style.display = 'none';
    document.getElementById('tabla-registros-procedimientos').style.display = 'none';
    // Mostrar el formulario de registros
    document.getElementById('tabla-formulario').style.display = 'block';
}

//funcion para mostrar la tabla de registros
function mostrarRegistros() {
    // Ocultar el formulario de registros y el formulario de procedimientos
    document.getElementById('tabla-formulario').style.display = 'none';
    document.getElementById('tabla-procedimentos').style.display = 'none';
    document.getElementById('tabla-registros-procedimientos').style.display = 'none';
    // Mostrar la tabla de registros
    document.getElementById('tabla-registros').style.display = 'block';
}

//funcion para mostrar el formulario de procedimiento
function mostrarFormularioProcedimiento() {
    // Ocultar el formulario de registros y la tabla de registros
    document.getElementById('tabla-formulario').style.display = 'none';
    document.getElementById('tabla-registros').style.display = 'none';
    document.getElementById('tabla-registros-procedimientos').style.display = 'none';
    
    // Mostrar el formulario de procedimientos
    document.getElementById('tabla-procedimentos').style.display = 'block';
}

//funcion para mostrar los registros del procedimento

function mostrar_registro_procedimiento() {
    document.getElementById('tabla-formulario').style.display = 'none';
    document.getElementById('tabla-registros').style.display = 'none';
    document.getElementById('tabla-procedimentos').style.display = 'none';
    document.getElementById('tabla-registros-procedimientos').style.display = 'block';
    
}


//funcion para mostrar la tabla de registros
function mostrar_Registros() {
    // Ocultar todas las secciones de contenido
    document.getElementById('tabla-usuarios').style.display = 'none';
    document.getElementById('tabla-procedimentos').style.display = 'none';
    // Mostrar la tabla de registros
    document.getElementById('tabla-registros').style.display = 'block';
}

//funcion para mostrar la tabla de usuarios
function mostrarUsuarios() {
    // Ocultar todas las secciones de contenido
    document.getElementById('tabla-registros').style.display = 'none';
    document.getElementById('tabla-procedimentos').style.display = 'none';
    // Mostrar la tabla de usuarios
    document.getElementById('tabla-usuarios').style.display = 'block';
}

//fincion para mostrar la tabla de procedimientos
function mostrar_procedimentos() {
    // Ocultar todas las secciones de contenido
    document.getElementById('tabla-registros').style.display = 'none';
    document.getElementById('tabla-usuarios').style.display = 'none';
    // Mostrar la tabla de procedimientos
    document.getElementById('tabla-procedimentos').style.display = 'block';
}

function manejarEnvioFormulario(formId) {
    document.getElementById(formId).onsubmit = function(event) {
        event.preventDefault();

        const formData = new FormData(this); 

        fetch('controlador/controlador_CRUD.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(response => response.json()) 
        .then(data => {
            if (data) {
                alert("¡Modificación exitosa!");

                if (formId === 'equiposModificacion') {
                    actualizarTablaEquipos(data);
                } else if (formId === 'tecnicosModificacion') {
                    actualizarTablaTecnicos(data);
                } else if (formId === 'procedimientosModificacion') {
                    actualizarTablaProcedimientos(data);
                }

                document.getElementById('tabla-modificacion-equipos').style.display = 'none';
                document.getElementById('tabla-modificacion-tecnicos').style.display = 'none';
                document.getElementById('tabla-modificacion-procedimientos').style.display = 'none';
            }
        })
        .catch(error => {
            console.log('Error', error);
            alert("Ocurrió un error al intentar modificar el registro.");
        });
    };
}

function actualizarTablaEquipos(equipo) {
    const tbody = document.querySelector('#tabla-registros tbody');
    const existingRow = tbody.querySelector(`tr[data-id="${equipo.ID_equipo}"]`);

    const row = `<tr data-id="${equipo.ID_equipo}">
        <td>${equipo.ID_equipo}</td>
        <td>${equipo.tipo_equipo}</td>
        <td>${equipo.marca}</td>
        <td>${equipo.estado_equipo}</td>
        <td>${equipo.fecha_ingreso}</td>
        <td>${equipo.fecha_entrega}</td>
        <td>${equipo.observaciones}</td>
        <td>${equipo.documento_tecnico}</td>
        <td>${equipo.sede}</td>
        <td>
            <button class="btn modificar" onclick="editarRegistro_equipos('${equipo.ID_equipo}', '${equipo.marca}', '${equipo.estado_equipo}', '${equipo.fecha_ingreso}', '${equipo.fecha_entrega}', '${equipo.observaciones}', '${equipo.sede}')">Modificar</button>
            <button class="btn eliminar" onclick="eliminarRegistro('${equipo.ID_equipo}', 'equipo')">Eliminar</button>
        </td>
    </tr>`;

    if (existingRow) {
        existingRow.innerHTML = row; 
    } else {
        tbody.innerHTML += row; 
    }
}

function actualizarTablaTecnicos(tecnico) {
    const tbody = document.querySelector('#tabla-usuarios tbody');
    const existingRow = tbody.querySelector(`tr[data-documento="${tecnico.documento}"]`);

    const row = `<tr data-documento="${tecnico.documento}">
        <td>${tecnico.documento}</td>
        <td>${tecnico.nombre_tecnico}</td>
        <td>${tecnico.ficha}</td>
        <td>${tecnico.FK_usuario}</td>
        <td>${tecnico.sede}</td>
        <td>
            <button class="btn modificar" onclick="editarRegistro_tecnicos('${tecnico.documento}', '${tecnico.ficha}', '${tecnico.nombre_tecnico}', '${tecnico.FK_usuario}', '${tecnico.sede}')">Modificar</button>
            <button class="btn eliminar" onclick="eliminarRegistro('${tecnico.documento}', 'tecnico')">Eliminar</button>
        </td>
    </tr>`;

    if (existingRow) {
        existingRow.innerHTML = row; 
    } else {
        tbody.innerHTML += row; 
    }
}

function actualizarTablaProcedimientos(procedimiento) {
    const tbody = document.querySelector('#tabla-procedimientos tbody');
    const existingRow = tbody.querySelector(`tr[data-id="${procedimiento.ID_procedimientos}"]`);

    const row = `<tr data-id="${procedimiento.ID_procedimientos}">
        <td>${procedimiento.ID_procedimientos}</td>
        <td>${procedimiento.descripcion_procedimiento}</td>
        <td>${procedimiento.fecha_procedimiento}</td>
        <td>${procedimiento.FK_equipo}</td>
        <td>${procedimiento.FK_tecnico}</td>
        <td>
            <button class="btn modificar" onclick="editarRegistro_procedimiento('${procedimiento.ID_procedimientos}', '${procedimiento.descripcion_procedimiento}', '${procedimiento.fecha_procedimiento}', '${procedimiento.FK_equipo}', '${procedimiento.FK_tecnico}')">Modificar</button>
            <button class="btn eliminar" onclick="eliminarRegistro('${procedimiento.ID_procedimientos}', 'procedimiento')">Eliminar</button>
        </td>
    </tr>`;

    if (existingRow) {
        existingRow.innerHTML = row; 
    } else {
        tbody.innerHTML += row; 
    }
}

// EDICIONES DE LAS TABLAS admin
function editarRegistro_equipos(ID_equipo, marca, estado_equipo, fecha_ingreso, fecha_entrega, observaciones, sede) {
    document.getElementById('editar-ID_equipo').value = ID_equipo;
    document.getElementById('editar-marca').value = marca;
    document.getElementById('editar-estado_equipo').value = estado_equipo;
    document.getElementById('editar-fecha_ingreso').value = fecha_ingreso;
    document.getElementById('editar-fecha_entrega').value = fecha_entrega;
    document.getElementById('editar-observaciones').value = observaciones;
    document.getElementById('editar-sede').value = sede;

    document.getElementById('tabla-modificacion-equipos').style.display = 'block';
}

function editarRegistro_tecnicos(documento, ficha, nombre_tecnico, FK_usuario, sede) {
    document.getElementById('editar-documento').value = documento;
    document.getElementById('editar-ficha').value = ficha;
    document.getElementById('editar-nombre_tecnico').value = nombre_tecnico;
    document.getElementById('editar-FK_usuario').value = FK_usuario;
    document.getElementById('editar-sede').value = sede

    document.getElementById('tabla-modificacion-tecnicos').style.display = 'block';
}

function editarRegistro_procedimiento(ID_procedimientos, descripcion_procedimiento, fecha_procedimiento, FK_equipo, FK_tecnico) {
    document.getElementById('editar-ID_procedimientos').value = ID_procedimientos; 
    document.getElementById('editar-descripcion_procedimiento').value = descripcion_procedimiento;
    document.getElementById('editar-fecha_procedimiento').value = fecha_procedimiento;
    document.getElementById('editar-FK_equipo').value = FK_equipo;
    document.getElementById('editar-FK_tecnico').value = FK_tecnico;

    document.getElementById('tabla-modificacion-procedimientos').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    manejarEnvioFormulario('equiposModificacion');
    manejarEnvioFormulario('tecnicosModificacion');
    manejarEnvioFormulario('procedimientosModificacion');
});

// ELIMINACION DE REGISTROS EN LAS TABLAS admin y tecnico
function eliminarRegistro(id, tipo, origen) {
    let formType = tipo === 'equipo' ? 'eliminar_equipo' : 
                   tipo === 'tecnico' ? 'eliminar_tecnico' : 
                   'eliminar_procedimiento'; 
    let idField = tipo === 'equipo' ? 'ID_equipo=' + id : 
                  tipo === 'tecnico' ? 'documento=' + id : 
                  'ID_procedimiento=' + id; 

    if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
        fetch('controlador/controlador_CRUD.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'form_type=' + formType + '&' + idField + '&origen=' + origen // Agregar el parámetro de origen
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Muestra el mensaje de éxito o error

            // Redirigir según el origen
            if (origen === 'inicio') {
                window.location.href = 'inicio.php';
            } else {
                window.location.href = 'admin_inicio.php';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Ocurrió un error al intentar eliminar el registro.");
        });
    }
}

// MODIFICACIONES Y AGRECACIONES DE LAS TABLAS tenicos
function tecnicos_editarRegistro_equipos(ID_equipo, marca, estado_equipo, fecha_ingreso, fecha_entrega, observaciones, sede) {
    document.getElementById('editar-ID_equipo').value = ID_equipo;
    document.getElementById('editar-marca').value = marca;
    document.getElementById('editar-estado_equipo').value = estado_equipo;
    document.getElementById('editar-fecha_ingreso').value = fecha_ingreso;
    document.getElementById('editar-fecha_entrega').value = fecha_entrega;
    document.getElementById('editar-observaciones').value = observaciones;
    document.getElementById('editar-sede').value = sede;

    document.getElementById('tabla-modificacion-registros').style.display = 'block';
}

function tecnicos_agregarProcedimientos(ID_procedimientos, descripcion_procedimiento, fecha_procedimiento, FK_equipo, FK_tecnico) {
    document.getElementById('agregar-ID_procedimiento'). value = ID_procedimientos;
    document.getElementById('agregar-descripcion_procedimiento').value = descripcion_procedimiento;
    document.getElementById('agregar-fecha_procedimiento').value = fecha_procedimiento;
    document.getElementById('agregar-FK_equipo').value = FK_equipo;
    document.getElementById('agregar-documento_tecnico').value = FK_tecnico;
}

// FUNCION DEL BOTON "CANCELAR" EN LOS FORMULARIOS DE MODIFICACION admin y tecnico
function formularioCancelar(tipo) {
    if (tipo === 'equipo') {
        document.getElementById('tabla-modificacion-equipos').style.display = 'none';
        mostrar_Registros(); 

    } else if (tipo === 'tecnico') {
        document.getElementById('tabla-modificacion-tecnicos').style.display = 'none';
        mostrarUsuarios(); 

    } else if (tipo === 'procedimiento') {
        document.getElementById('tabla-modificacion-procedimientos').style.display = 'none';
        mostrar_procedimentos();

    } else if (tipo === 'tecnico-equipo') {
        document.getElementById('tabla-modificacion-registros').style.display = 'none';
        mostrar_Registros();
    }
}
