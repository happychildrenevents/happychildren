var fadeTime = 300;

var taxRate = 0.00;
var shippingRate = 0.00;
var cumpleReglas = false;


var p0 = document.getElementById("p0");
var p1 = document.getElementById("p1");

p0.style.display = "none";
p1.style.display = "block";





/* Assign actions */
$('.product-quantity input').change(function() {
  updateQuantity(this);
});



/* Recalculate cart */
function recalculateCart() {
  var subtotal = 0;

  /* Sum up row totals */
  $('.product').each(function() {
    subtotal += parseLocalNum($(this).children('.product-line-price').text());
  });




  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = (subtotal > 0 ? shippingRate : 0);
  var total = subtotal + tax + shipping;


  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('#cart-subtotal').html(subtotal.format(0, 3, '.'));
    $('#cart-tax').html(tax.format(0, 3, '.'));
    $('#cart-shipping').html(shipping.format(0, 3, '.'));
    $('#cart-total').html(total.format(0, 3, '.'));
    if (total == 0) {
      $('.checkout').fadeOut(fadeTime);
    } else {
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });

  var pedido = "Pedido es [";
  if (total != "") {
    $('.product').each(function() {
      if ($(this).find('input').val() > 0) {
        pedido = pedido + " {";
        pedido = pedido + "Nombre:" + $(this).find('input').attr('name') + ";";
        pedido = pedido + "Precio unitario:  " + $(this).children('.product-price').text() + ";";
        pedido = pedido + "Cantidad: " + $(this).find('input').val() + ";";
        pedido = pedido + "Subtotal: " + $(this).children('.product-line-price').text() + ";";
        pedido = pedido + " } *";
      }
    });
    pedido = pedido + "] Total " + total;

  } else {
    pedido = pedido + "] Sin Datos de pedido - Contactar";
  }
  $('input[name=pedido]').val(pedido);

  var p0 = document.getElementById("p0");
  var p1 = document.getElementById("p1");

  if (total > 30000) {

    p0.style.display = "block";
    p1.style.display = "none";
  } else {
    p0.style.display = "none";
    p1.style.display = "block";
  }
}


/* Update quantity */
function updateQuantity(quantityInput) {
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(parseLocalNum(productRow.children('.product-price').text()));
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;

  /* Update line price display and recalc cart totals */
  productRow.children('.product-line-price').each(function() {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.format(0, 3, '.'));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });
}


function parseLocalNum(num) {
    return +(num.replace(".", ""));
}



Number.prototype.format = function(n, x, s, c) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = this.toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};
