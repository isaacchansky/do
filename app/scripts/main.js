/* jshint devel:true */

$(document).ready(function(){
  'use strict';

  var $container = $('.js-todo-container');
  var tpl = $('.js-todo-tpl').html();
  var todos = JSON.parse( localStorage.getItem('todos') );

  if(!todos || todos.length === 0) {
    todos = [''];
  }

  function focusLast () {
    $container.find('input').last().focus();
  }

  function addNew () {
    $container.append(tpl);
    $(document).trigger('todos:changed');
  }

  function deleteTodo (e) {
    $(e.target).parent().remove();
    $(document).trigger('todos:changed');
  }

  function saveTodos () {
    var todos = $.map( $('.js-todo-text'), function(el){
      return el.value;
    });
    todos = todos.filter(function(t){ return t.length > 0; });
    localStorage.setItem('todos', JSON.stringify(todos) );
  }

  $(document).on('click', '.js-todo-add', addNew);

  $(document).on('click', '.js-todo-delete', deleteTodo);

  $(document).on('change', '.js-todo-text', saveTodos);

  $container.on('keydown', 'input', function(e){
    var key = e.which;
    if( key === 13 && e.target.value.length !== 0) {
      e.preventDefault();
      addNew();
      return;
    }
    if(key === 8 && e.target.value.length === 0) {
      e.preventDefault();
      deleteTodo(e);
      return;
    }
  });


  $(document).on('todos:changed', function(){
    saveTodos();
    focusLast();
  });

  $.each(todos, function(i, todoText){
    var $tpl = $(tpl);
    $tpl.find('input').val(todoText);
    $container.append($tpl);
  });


});

