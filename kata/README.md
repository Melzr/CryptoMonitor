# Kata

Se desea modelar un pequeño problema, se desea contar con una billetera virtual, 
que pueda guardar valores que corresponden a una criptomoneda. 
Debo poder agregarle y quitarle cantidad de la moneda.
No debo poder agregar ni quitar cantidades negativas

Las monedas cambian la cotización frente a otra moneda base en el mercado externo. 
Y se desea monitorear los cambios de valor de las monedas para detectar cambios. 

Específicamente se desea detectar cuando el valor de cada moneda, desde que se empieza a monitorear, 
si cae un 5% del valor máximo registrado, y en ese caso se desea vender una cantidad fija de esa moneda contra la moneda base. 

A partir de ese momento, se continua el monitorear pero ahora para registrar cuando el valor de la misma, 
si sube un 5% del valor mínimo registrado, y en ese caso se desea comprar nuevamente la moneda original en la misma cantidad. 
Y así continuar iterando y monitoreando continuamente el mercado.

Tambien sabemos que se cuenta con una API de binance para hacer operaciones de compra y venta 
y un websockets al cual podemos subcribirnos y ser notificados ante un cambio de cotizacion

### Correr tests

```
npm test
```
