# PC Components API
Este proyecto tiene la finalidad de otorgar una API desde la que se pueda acceder a información básica de diferentes componentes de computadora, como pueden ser `Motherboard`, `CPU`, `GPU`, `RAM`, entre otros.

# Uso

Esta API está pensada para realizarse completamente bajo el uso de `JavaScript`, a fin de demostrar conocimientos en desarrollo backend en este lenguaje y manejo de bases de datos no relacionales con `MongoDB`.

Inicialmente, se deberá crear un archivo llamado `credentials.js`, de modo que se puedan tomar las credenciales de acceso a la base de datos y realizar exitosamente la conexión con la misma; el archivo deberá contener la siguiente estructura:
```js
const DBuser = "usuario";
const DBpassword = "contraseña";
const DBhost= "host";

module.exports = {DBuser, DBpassword, DBhost}
```

Estas credenciales deberán obtenerse desde el sistema gestor de MongoDB.

Al levantar la aplicación, esta se levantará de manera local en el puerto 6661; esto puede cambiarse en el archivo `index.js` en el mismo directorio donde se descargue el repositorio. A fin de proporcionar ejemplos del funcionamiento de la API, se utilizará la convención `localhost` para proporcionar una URL más completa.

## Rutas

Se cuenta con diferentes rutas establecidas para el manejo de los datos registrados y por registrar en la base de datos. Todas las respuestas se envían como JSON.
### __Get__

- `/components`: Realizar una petición _get_ a esta ruta devolverá un array con todos los registros que coincidan exactamente con los filtros que se pasen mediante query en la URL; si no se pasa ningún filtro mediante query, traerá todos los registros que se encuentren en la BBDD. Por ejemplo, la consulta `localhost:6661/components?category=CPU` dará como resultado algo parecido a esto:

```json
[
  {
    "_id": "6431001531266b73ec836249",
    "manufacturer": "AMD",
    "name": "Ryzen 5 7600",
    "category": "CPU",
    "socket": "AM5",
    "chipset": [
      "X670E",
      "X670",
      "B650E",
      "B650"
    ],
    "memory": {
      "type": "DDR5",
      "max": 128
    }
  },
  {
    "_id": "644474d417d2b722cd17cb86",
    "manufacturer": "AMD",
    "name": "Ryzen 5 3400G",
    "category": "CPU",
    "socket": "AM4",
    "chipset": [
      "X570",
      "X470",
      "X370",
      "B450",
      "B350",
      "A320"
    ],
    "memory": {
      "max": 64,
      "type": "DDR4"
    }
  }
]
```
- `/components/:id`: Al hacer una petición a esta ruta, el sistema buscará, mediante ID, el registro exacto en la BBDD que coincida con el ID proporcionado. La consulta `localhost:6661/components/6431001531266b73ec836249` verá un resultado similar a este:
```json
{
  "_id": "6431001531266b73ec836249",
  "manufacturer": "AMD",
  "name": "Ryzen 5 7600",
  "category": "CPU",
  "socket": "AM5",
  "chipset": [
    "X670E",
    "X670",
    "B650E",
    "B650"
  ],
  "memory": {
    "type": "DDR5",
    "max": 128
  }
}
```
### __Post__
Antes de axplicar la ruta post, se debe comprender la estructura de los datos para realizar un correcto registro y uso de los diferentes componentes almacenados.

Todos los componentes registrados tienen 3 datos en común, los cuales son: 
```json
{
    "manufacturer": String,
    "name": String,
    "category": String
}
```

De ahí, cada categoría contiene datos específicos que la identifica como tal, estos son:
### Motherboard
```json
{
    "cpu": String,
    "chipset": String,
    "socket": String,
    "memory": {
      "max": Number,
      "slots": Number,
      "type": String,
      "hz": [Number, Number...]
    },
    "maxGraphics": Number,
    "form": String
}
```
### CPU
```json
{
    "socket": String,
    "chipset": [String, String...],
    "memory": {
      "type": String,
      "max": Number
    }
}
```
### GPU
```json
{
    "memory": Number
}
```
### RAM
```json
{
    "type": String,
    "capacity": Number,
    "frequency": Number
}
```
### Storage
```json
{
    "type": String,
    "capacity": Number
}
```
### Case
```json
{
    "form": String
}
```

### PSU
```json
{
    "watts": Number,
    "form": String
}
```
Esa es la estructura (actual) de los componentes que se registran en la base de datos.

- `/components`: Al realizar una petición _post_ a esta ruta se deberá enviar mediante _body_ los datos completos del componente a ser creado. Un ejemplo al enviar datos sería eniando un JSON con los siguientes datos:
```json
{
  "manufacturer": "AMD",
  "name": "Ryzen 5 7600",
  "category": "CPU",
  "socket": "AM5",
  "chipset": [
    "X670E",
    "X670",
    "B650E",
    "B650"
  ],
  "memory": {
    "type": "DDR5",
    "max": 128
  }
}
```
Esto registrará un documento dentro de la colección __components__ con los datos enviados.

__Todos los componentes registrados se almacenan dentro de la misma colección _components_, independientemente de su categoría individual.__
## __Put__
- `/components/update/:id`: Realizar un petición _put_ a esta ruta permitirá recibir por parámetro el ID de algún componente del que se desee actualizar una o más de sus propiedades; los datos a actualizar se envían por body. Un ejemplo de ello sería hacer una petición _put_ a `localhost:6661/components/update/6431001531266b73ec836249` y enviar por body:
```json
{
    "name": "Ryzen 5 7600x",
    "socket": "AM4"
}
```
Como se puede observar, no es necesario que se envíen todos los datos del componente, sino que los que se necesiten actualizar solo sobreescribirán los datos anteriores, dejando los demás intactos.
## __Delete__
- `/components/delete/:id`: Al hacer una petición _delete_ a esta ruta y pasando por parámetro el ID de algún componente, este será eliminado completamente de la base de datos. Un ejemplo sería haciendo una petición delete a `localhost:6661/components/delete/6431001531266b73ec836249`; esto borrará tal registro.

# Dependencias

Para la realización de este proyecto se han utilizado las siguientes librerías:
- __Express.js__
- __MongoDB__
- __nodemon__
- __Body-Parser__