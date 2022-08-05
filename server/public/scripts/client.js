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
  $('#viewKoalas').on('click', '.transferBtn', markReadyToTransfer);
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
    console.log(response);
    appendKoalas(response);
  }).catch(function(err) {
    console.log(err);
    alert('Error in GET');
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

function appendKoalas(koalas) {
  console.log('appending koalas');
  $('#viewKoalas').empty();
  for (let koala of koalas) {
    if (koala.ready_to_transfer === true) {
      $('#viewKoalas').append(`
        <tr data-id=${koala.id}>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.ready_to_transfer}</td>
          <td>${koala.notes}</td>
          <td>Ready!</td>
          <td><button class=deleteBtn>Delete</button>
        </tr>
      `)
    } else {
      $('#viewKoalas').append(`
        <tr data-id=${koala.id}>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.ready_to_transfer}</td>
          <td>${koala.notes}</td>
          <td><button class="transferBtn">Ready to Transfer</button></td>
          <td><button class="deleteBtn">Delete</button></td>
        </tr>
      `) 
    }
  }
}
// PUT

// When the user clicks on the button that calls this function, it should update the database for the specific Koala. 
function markReadyToTransfer(){
  console.log('This button will change the database value from Ready to Transfer to Ready!');
  const id = $(this).closest('tr').data('id');
  const ready_to_transfer = $(this).text();
  console.log(ready_to_transfer)
  $.ajax({
    method: 'PUT',
    url: `/koalas/${id}`,
    data: {
      ready_to_transfer : true
    } // don't need the data technically.
  }).then(function(response){
    console.log(response);
    // console.log(response.ready_to_transfer)
    getKoalas();
  }).catch(function(err){
    console.log(err);
    alert('error in the markReadyToTransfer function.');
  })
}
