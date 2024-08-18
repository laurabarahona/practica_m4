function Producto(id, nombre, precio) {
    let _id = id;
    let _nombre = nombre;
    let _precio = precio;

    Object.defineProperties(this, {
        id: {
            get: function () {
                return _id;
            }
        },
        nombre: {
            get: function () {
                return _nombre;
            }
        },
        precio: {
            get: function () {
                return _precio;
            }
        }
    });
}

let productos = [
    new Producto(1, "Leche", 1000),
    new Producto(2, "Pan de Molde", 2000),
    new Producto(3, "Queso", 1200),
    new Producto(4, "Mermelada", 890),
    new Producto(5, "Azúcar", 1300)
];

function Carrito() {
    this.productos = [];
    this.totalCantidad = 0; 
    
    this.addProducto = function (product, cantidad) {
        let encontrarProducto = this.productos.find(function(item) {
            return item.id === product.id;
        });
        if (encontrarProducto) {
            encontrarProducto.cantidad = encontrarProducto.cantidad + cantidad;
        } else {
            product.cantidad = cantidad;
            this.productos.push(product);
        }
        this.totalCantidad = this.totalCantidad + cantidad; 
        this.actualizarTotal();
        this.mostrarResumen(); 
    };

    this.actualizarTotal = function() {
        let total = this.productos.reduce(function(acumulador, producto) {
            return acumulador + (producto.precio * producto.cantidad);
        }, 0);
        document.getElementById("total").textContent = total;
    };

    this.mostrarResumen = function() {
        let resumen = document.getElementById("resumen");
        resumen.innerHTML = ""; 
        this.productos.forEach(function(producto) {
            let productoResumen = document.createElement('p');
            productoResumen.textContent = `${producto.nombre}: ${producto.cantidad} unidad(es)`;
            resumen.appendChild(productoResumen);
        });
    };
}

let miCarrito = new Carrito();

function calcularTotalVenta(cart) {
    let total = cart.reduce(function(acumulador, producto) {
        return acumulador + (producto.precio * producto.cantidad);
    }, 0);
    alert(`Total a pagar: $${total}`);
    alert("Gracias por tu compra ☺️");
}

document.querySelectorAll(".btn").forEach(function(btn) {
    btn.addEventListener("click", function(evento) {
        evento.preventDefault();
        let id = parseInt(this.id);
        let cantidad;

        while (true) {
            cantidad = parseInt(prompt("Ingresa la cantidad de unidades:"));
            if (!isNaN(cantidad) && cantidad > 0) {
                break;
            } else {
                alert("Opción no válida. Intenta nuevamente.");
            }
        }

        let producto = productos.find(function(item) {
            return item.id === id;
        });
        if (producto) {
            miCarrito.addProducto(producto, cantidad);
            alert(`${cantidad} ${producto.nombre}(s) agregado(s) al carrito.`);
        }

        let confirmacion;
        while (true) {
            confirmacion = prompt("¿Desea seguir agregando productos al carrito? s/n").toLowerCase();
            if (confirmacion === "s" || confirmacion === "n") {
                break;
            } else {
                alert("Opción no válida. Intenta nuevamente.");
            }
        }

        if (confirmacion === "n") {
            calcularTotalVenta(miCarrito.productos);
        }
    });
});