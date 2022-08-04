console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready


// CLICK LISTENERS //

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
} // end click listeners


// FUNCTIONS //

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  }).then(function (response) {
    appendKoalas(response)
  }).catch(function(err) {
    console.log(err)
    alert('Error in GET')
  })
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to add koalas
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: newKoala
  }).then(function(response) {
    console.log(response)
    getKoalas(response);
  }).catch(function(err) {
    console.log(err)
    alert('Error in POST')
  });
 
}

function appendKoalas(response) {
  console.log(response);
  
}
