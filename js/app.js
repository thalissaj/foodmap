$(document).ready( function () {
  $('.preload').delay('3000').fadeOut('slow'); //delay diminuido, dps aumenta ele
});
openMap();
function openMap() {
  var mymap = L.map('mapid').setView([ -23.5577357, -46.660911999999996], 15);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGhhbGlzc2FqIiwiYSI6ImNqa2hhdnZ0bDBzYzEzcG1sN3FpaXM0c2wifQ.Nd6HsCGOvZcTgMXRy_XLJw', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);
  //add marker
  var mapPositions = restaurantes.map(function(n){
    return {
      position: [n.latitude, n.longitude]
    };
  })
  mapPositions.forEach(function(i){
    var marker = L.marker(i.position).addTo(mymap);
  })
}
//filtro
function executeFilter() {
  var input = $('#filter');
  var filter = input.val().toUpperCase();
  var ul = $('#filterList');
  var li = $('li');
  for (i = 0; i < li.length; i++) {
        var a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
//mostrar imagens ao filtro selecionado
function catchImages (type){
  var images = $('#showImages');
  images.addClass('conteiner-img');
  var allRestaurantes = [];
  restaurantes.map(function (x){
    if (x.type === type) {
      allRestaurantes.push(x);
    }
  });
  var j = 0;
  allRestaurantes.forEach(function (i){
    var urlImages = i.image;
    var modalType = type;
    var newDiv = $('<div></div>').css('background-image', 'url(' + urlImages + ')').css('width', '200px').css('height', '200px').css('margin', '15px').css('background-size', 'contain').css('background-repeat', 'no-repeat').addClass(type + [j] + " callModal").attr("data-toggle", "modal").attr("data-target", "#choiceModal").attr("onclick", "fillModal('"+type+"','"+j+"')");
    j++;
    $('#showImages').append(newDiv);
  }
  )
}
function clearModal(){
  $('#modalTitle').html('');
  $('#modalBody').html('');
}
function fillModal(type, index) {
  clearModal();
  var allRestaurantes = [];
  restaurantes.map(function (x){
    if (x.type === type) {
      allRestaurantes.push(x);
    }
  });
  $('#modalTitle').append(allRestaurantes[index].name);
  var informations = $('<div></div>').text('Descrição: '+ allRestaurantes[index].description);
  $('#modalBody').append(informations);
  $('#modalClose').click(function () {clearDiv();});
}
function clearDiv(){
  $('#showImages').html('');
  $('#filter').val('');
}
function arabe() {
  clearDiv();
  catchImages('arabe');
  $('#filter').val('Arabe');
}
function fastFood() {
  clearDiv();
  catchImages('fast food');
  $('#filter').val('Fast Food');
}
function italian() {
  clearDiv();
  catchImages('italiana');
  $('#filter').val('Italiano');
}
function japonese() {
  clearDiv();
  catchImages('japonesa');
  $('#filter').val('Japones');
}
function vegan() {
  clearDiv();
  catchImages('vegana');
  $('#filter').val('Vegano');
}
