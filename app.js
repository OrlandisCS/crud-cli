require("colors");
const { guardarDb, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pause,
  leerInput,
  deleteTask,
  confirmar,
  mostrarCheckList,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
console.clear();
const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasArr(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listaPendientesoCompletadas();
        break;
      case "4":
        tareas.listaPendientesoCompletadas((completada = false));
        break;
      case "5":
        const ids = await mostrarCheckList(tareas.listadoArr);
        tareas.toggleTareas(ids);
        break;
      case "6":
        const id = await deleteTask(tareas.listadoArr);
        const ok = await confirmar("¿ Estas seguro?");
        if (ok) {
          if (id !== "0") {
            tareas.deleteTask(id);
            console.log("Tarea borrada correctamente\n".green);
          }
        }
        break;
    }
    guardarDb(tareas.listadoArr);
    if (opt !== "0") await pause();
  } while (opt !== "0");
};
main();
