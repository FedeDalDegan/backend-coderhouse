// Modulo "DAO"

/*
Es una capa de ABSTRACCION que se genera en los modulos (Ejemplo, un MODULO DE AJEDREZ)
La cual es agnostica a la base de datos a la que se realiza una peticion.

Es decir, no importa si este modulo de ajedrez consulta una base de datos antigua, como podria ser Postgres,
O si le consulta a una mas reciente, como podria ser MongoDB.
Sea cual sea la BDD consultada, la informacion debe de llegar

Esto se lo conoce como una "capa de abstraccion"
*/

/*
    MODULO DE AJEDREZ
            |
            V
    DAO (Data Access Object)
            |
            V
    Postgress / MongoDB
(1900 - 2009) / (2010 - ACTUALIDAD)

Tanto postgress como mongo responderan a la consulta
*/

// Este "DAO" recibe una solicitud del servidor (Ejemplo: Buscar partidas 2022)
// En este caso, el DAO buscara la partida en la base de datos MONGODB, ya que la partida es del 2022.
// Si fuese mas antigua a 2010, buscaria en la de Postgresql