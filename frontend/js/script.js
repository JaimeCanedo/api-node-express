// Función para cargar la lista de empleados
const loadEmployees = async () => {
  try {
    const response = await fetch('http://localhost:8085/api/employees');
    const employees = await response.json();
    employeesList.innerHTML = '';
    // Recorrer cada empleado
    for (const employee of employees) {
      // Hacer una solicitud para obtener el nombre del departamento
      const departmentResponse = await fetch(`http://localhost:8085/api/departments/${employee.id_departamento}`);
      const department = await departmentResponse.json();
      // Crear un elemento para mostrar la información del empleado
      const employeeItem = document.createElement('div');
      employeeItem.classList.add('employee-item');
      employeeItem.innerHTML = `
        <p>ID Empleado: ${employee.id_empleado}</p>
        <p>Departamento: ${department.nombre}</p>
        <p>Nombre: ${employee.nombre}</p>
        <p>Sueldo: ${employee.sueldo}</p>
        <button onclick="deleteEmployee(${employee.id_empleado})">Eliminar</button>
        <button onclick="updateEmployeeForm(${employee.id_empleado}, '${employee.nombre}', '${employee.id_departamento}', ${employee.sueldo})">Modificar</button>
      `;
      employeesList.appendChild(employeeItem);
    }
  } catch (error) {
    console.error('Error al cargar empleados:', error);
  }
};

// Función para enviar el formulario y crear un nuevo empleado
employeeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  //const id_empleado = document.getElementById('id_empleado').value;
  const id_departamento = document.getElementById('departamento').value;
  const nombre = document.getElementById('nombre').value;
  const sueldo = document.getElementById('sueldo').value;
  try {
    await fetch('http://localhost:8085/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_departamento, nombre, sueldo })
    });
    employeeForm.reset();
    loadEmployees();
  } catch (error) {
    console.error('Error al crear empleado:', error);
  }
});


// Función para abrir el formulario de actualización de empleado
function updateEmployeeForm(id_empleado, nombre, departamento, sueldo) {
  // Crear el formulario
  const form = document.createElement('form');

  // Agregar campos al formulario
  const nombreInput = document.createElement('input');
  nombreInput.setAttribute('type', 'text');
  nombreInput.setAttribute('placeholder', 'Nuevo nombre');
  nombreInput.setAttribute('value', nombre);
  form.appendChild(nombreInput);

  const departamentoInput = document.createElement('input');
  departamentoInput.setAttribute('type', 'number');
  departamentoInput.setAttribute('placeholder', 'Nuevo departamento');
  departamentoInput.setAttribute('value', departamento);
  form.appendChild(departamentoInput);

  const sueldoInput = document.createElement('input');
  sueldoInput.setAttribute('type', 'number');
  sueldoInput.setAttribute('placeholder', 'Nuevo sueldo');
  sueldoInput.setAttribute('value', sueldo);
  form.appendChild(sueldoInput);

  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.textContent = 'Actualizar';
  form.appendChild(submitButton);

  // Agregar evento de envío del formulario
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const updatedNombre = nombreInput.value;
    const updatedDepartamento = departamentoInput.value;
    const updatedSueldo = sueldoInput.value;

    try {
      await updateEmployee(id_empleado, updatedDepartamento, updatedNombre, updatedSueldo);
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
    }
  });

  // Limpiar el div y agregar el formulario
  employeesList.innerHTML = '';
  employeesList.appendChild(form);
}

// Función para actualizar los datos de un empleado
const updateEmployee = async (id_empleado, departamento, nombre, sueldo) => {
  try {
    await fetch(`http://localhost:8085/api/employees/${id_empleado}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ departamento, nombre, sueldo })
    });
    loadEmployees(); // Recargar la lista de empleados después de la actualización
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
  }
};

// Función para eliminar un empleado
const deleteEmployee = async (id_empleado) => {
  try {
    await fetch(`http://localhost:8085/api/employees/${id_empleado}`, {
      method: 'DELETE'
    });
    loadEmployees();
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
  }
};

// Cargar la lista de empleados al cargar la página
window.onload = loadEmployees;
