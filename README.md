# Book Store - Prueba Tecnica

_Solucion a lo planteado el prueba tecnica_

## Comenzando 🚀
_Estas instrucciones te permitiran tener una copia del proyecto en funcionamiento para correrla en tu maquina local_

### Requisitos para poder correr el proyecto
    - PHP instalado
    - Composer instalado
    - NodeJS instalado
    - Docker installado y funcional
    - Una terminal o Consola de windows


Despues de tener todos los requisitos, vamos a instalar las dependencias

composer install 

_Esto instalar los paquetes necesarios para que la aplicacion funcione_


Despues vamos a instalar las dependencias de node para el Frontend

    npm install

    npm run dev


Ahora solo nos queda correr los contenedores de docker

    docker-compose up -d

Ahora ejecutamos las migraciones para la base de datos

    docker-compose exec app php artisan migrate:fresh --seed


_**Si nos arroja un mensaje de error diciendo "No application encryption key has been specified."**_

Entonces solo ejecutamos

    docker-compose exec app php artisan key:generate


## Configuracion del cliente OAuth2

_Para usar OAuth2 instale el paquete de laravel-passport, que permite realizar 
el proceso de autenticacion de forma segura._

_El cliente que consumira los recursos del servidor sera una aplicacion escrita en react
que se encuentra alojada en el proyecto._

_Para que esta aplicacion pueda tener acceso a los recursos API del proyecto, primero debe
ser authenticada como cliente del servidor._

Y para ello, vamos a crear un nuevo cliente de OAuth en el proyecto con el siguiente comando:

    docker-compose exec app php artisan passport:install

_Esto instalara los clientes de OAuth en el proyecto_

Ahora solo debemos enfocarnos en el Client ID: 2 y copiar el **Client Secret**

Reemplaze y pegue la siguiente linea en el archivo *resource/js/config/oauth_constants.js*

    static client_secret = 'pegue_el_nuevo_client_secret



Esto es lo que nos dara acceso a los recursos del servidor.




Listo el proyecto esta corriendo correctamente


