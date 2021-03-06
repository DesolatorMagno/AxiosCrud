# AxiosCrud: Base para Enviar datos desde el front para crud

## Requisitos
* Axios
* Sweetalert2

## Requisitos.
Para poder comenzar a trabajar con este archivo primero se deberá incluir las siguientes librerías al html y por ultimo al mismo archivo como tal.

### CSS :
`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@7.26.10/dist/sweetalert2.min.css">`

### JS
`<script src = "https://unpkg.com/axios/dist/axios.min.js" > </script>`

`<script src= "https://cdn.jsdelivr.net/npm/sweetalert2@7.26.10/dist/sweetalert2.all.min.js" ></script>`

## Modo de empleo:

Este paquete se basa en nombre de clases especificas y de campos data-set para su funcionamiento.

### Create y Update:
Un simple formulario activando su evento submit es suficiente para asegurar que se envíe la información al back, debido a esto la forma para almacenar como para actualizar es prácticamente la misma como se podrá ver a continuación.

Para almacenar

`<form action="" method="POST" role="form" class="crud-store" data-url="{{ route('user.store') }}">`

Para Actualizar

`<form action="" method="POST" role="form" class="crud-update" data-url="{{ route('user.update', ['id' => $user->id]) }}">`

Lo único que cambia es la clase aplicada a la misma.

## Delete

Con delete es mas sencillo aun, solo se requiere cualquier elemento html el cual registre un click y la clase delete.

`<button class="crud-delete" data-url={{ route('user.destroy', ['id' => $user->id]) }}>Borrar</button>`

Y eso es todo lo que se requiere, solamente colocar una de las 3 clases requeridas (crud-store, crud-update, crud-delete) y colocar el data-url con la url a la que se envía el request.

## Repuesta del back.
Ahora bien, debido a la implementación de SweetAlert para informa sobre el succes or fail de el request al usuario, se requiere una respuesta en un formato especifico desde el back, la cual debe ser de la forma :

`['text' => "Usuario creado", 'title' => "Usuario creado", 'type' => 'success'];`

Esta respuesta consta de lo mínimo necesario para realizar la muestra del Alert, en el futuro se agregaran mas campos opcionales para detalles como posición y tiempo que deberá durar en pantalla el alert, por ahora la misión es tener lo minino posible que permita un producto viable.

## TODO
Que hacer en caso de errores.
Volverlo una clase.