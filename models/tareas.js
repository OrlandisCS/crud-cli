const Tarea = require("./tarea");
const { formatDistanceToNow } = require("date-fns");
const { es } = require("date-fns/locale");
class Tareas {
  _listado = {};
  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }
  constructor() {
    this._listado = {};
  }
  cargarTareasArr(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }
  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }
  listadoCompleto() {
    console.log("\n");
    this.listadoArr.forEach((tarea, index) => {
      const idx = index + 1;
      const desc = tarea.desc;
      const estado =
        tarea.completadoEn === null ? "Pendiente".red : "Completada ".green;

      console.log(`${`${idx}. `.green} ${desc} :: ${estado}`);
    });
  }
  listaPendientesoCompletadas(completada = true) {
    console.log("\n");
    const tareas = this.listadoArr.filter((tarea) =>
      completada ? tarea.completadoEn !== null : tarea.completadoEn === null
    );

    tareas.forEach((tarea, index) => {
      const idx = index + 1;
      const desc = tarea.desc;
      const estado =
        tarea.completadoEn === null
          ? "Pendiente".red
          : `Completado Hace ${formatDistanceToNow(new Date(tarea.completadoEn), {
              locale: es,
            })}`.green;

      console.log(`${`${idx}.`.green} ${desc} :: ${estado}`);
    });
  }
  deleteTask(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }
  toggleTareas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = Date.now();
      }
    });
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}
module.exports = Tareas;
