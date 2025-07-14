
  // Cargar estudiantes desde localStorage al cargar la página
  window.onload = function () {
    const guardados = JSON.parse(localStorage.getItem("estudiantes")) || [];
    guardados.forEach(nombre => crearEstudiante(nombre));
  };

  function addTask() {
    const input = document.getElementById("taskInput");
    const name = input.value.trim();
    if (name !== "") {
      crearEstudiante(name);
      guardarLista();
      input.value = "";
    } else {
      alert("Por favor, escribe un nombre.");
    }
  }

  function crearEstudiante(nombre) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = nombre;

    const btnContainer = document.createElement("div");
    btnContainer.className = "btns";

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️ Editar";
    editBtn.onclick = function () {
      const inputEdit = document.createElement("input");
      inputEdit.type = "text";
      inputEdit.value = span.textContent;
      inputEdit.style.flex = "1";
      inputEdit.style.padding = "5px";
      inputEdit.style.marginRight = "10px";

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "💾 Guardar";
      saveBtn.onclick = function () {
        const nuevoTexto = inputEdit.value.trim();
        if (nuevoTexto !== "") {
          span.textContent = nuevoTexto;
          li.replaceChild(span, inputEdit);
          btnContainer.replaceChild(editBtn, saveBtn);
          guardarLista();
        }
      };

      li.replaceChild(inputEdit, span);
      btnContainer.replaceChild(saveBtn, editBtn);
      inputEdit.focus();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️ Eliminar";
    deleteBtn.onclick = function () {
      li.remove();
      guardarLista();
    };

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnContainer);
    document.getElementById("taskList").appendChild(li);
  }

  function guardarLista() {
    const spans = document.querySelectorAll("#taskList li span");
    const nombres = Array.from(spans).map(el => el.textContent);
    localStorage.setItem("estudiantes", JSON.stringify(nombres));
  }
