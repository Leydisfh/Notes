 Vamos a comunicar el front con el backend de nuestro proyecto
 
 ## Frontend
 1. Iciamos el proyecto con Vite y hacemos los pasos correspondientes como el npm install para instalar los modulos de node
 2. Realizamos nuestro codigo normal


 
 ## Backend
1. Iniciamos creando nuestra carpeta y dentro un archivo index.js
2. Instalamos nodemon para que el backend se actualice cada que hacemos una modificacion 
`npm install nodemon -D`
En el package.json agregamos:
<pre>
<code>
"scripts": {
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  </code>
  </pre>
  > Rodamos en la terminal `npm run dev`
3. Instalamos express usando `npm install express`. Esta librería se usa para crear aplicaciones web en Node.js de manera sencilla y eficiente.
4. EN nuestro archivo index.js importamos la libreria express
5. Luego creamos la app de express `const app = express()`
6. Luego mostramos lo que se ejecutara en la raiz de la aplicacion
<pre>
<code>
    app.get('/', (req, res) => {
        res.send('Hello World');
    })
</code>
</pre>

7. Debemos agregar a package.json debajo del main, que estamos trabajando con modulos
<pre>
<code>
    {
        "name": "backend",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
     -> "type": "module",
    }
</code>
</pre>
8. Debemos instalar Middleware de cors para que nos permita comunicar dos rutas diferentes ya que nuestro back esta en un puerto diferente al front , lo importamos 
9. usamos cors de la siguiuente manera 
<pre>
<code>
app.use(cors());
</code>
</pre>

> En nuestro codigo del front luego de terminarlo hacemos un build para mimificar nuestro codigo `npm run build`, luego la carpeta dist creada la copiamos en la raiz de nuestro proyecto backend y agregamos el siguiente codigo :

<pre>
<code>
//Middleware
app.use(cors()) // Para que se pueda hacer peticiones desde otro servidor
`app.use(express.static('dist')) // Para que se pueda acceder a la carpeta dist`
app.use(express.json()) // Para que se pueda leer el body de la peticion post
</code>
</pre>