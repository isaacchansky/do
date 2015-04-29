/* jshint devel:true */
console.log('\'Allo \'Allo!');


$(document).ready(function(){

  var $container = $('.js-todo-container');
  var tpl = $('.js-todo-tpl').html();
  var todos = JSON.parse( localStorage.getItem('todos') ) || [""];

  $.each(todos, function(i, todoText){
    var $tpl = $(tpl);
    $tpl.find('input').val(todoText);
    $container.append($tpl);
  });

  function addNew () {
    $container.append(tpl);
    $container.find('input').last().focus();
  }

  $('.js-todo-add').on('click', addNew);

  $('.js-todo-delete').on('click', function(e){
    $(e.target).parent().remove();
  })

  $container.on('keypress', 'input', function(e){
    var key = e.which;
    if( key === 13) {
      addNew();
    }
  })


  $container.on('change', '.js-todo-text', function(){

    var todos = $.map( $('.js-todo-text'), function(el){
      return el.value;
    });

    todos = todos.filter(function(t){ return t.length > 0;})

    console.log(todos);

    localStorage.setItem('todos', JSON.stringify(todos) );

  });

})

