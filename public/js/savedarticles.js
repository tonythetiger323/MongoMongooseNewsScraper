$(document).ready(() => {
  $.getJSON('api/articles/findSaved/true', data => {
    data.forEach(element => {
      $('#savedArticles').append(
        `<div id="${
          element._id
        }" class="card text-white bg-dark mb-3"><div class="card-header">${
          element.title
        }<button data-id="${
          element._id
        }" type="button" class="btn btn-outline-info notes">Article Notes</button><button data-id="${
          element._id
        }" type="button" class="btn btn-outline-info delete">Delete From Saved</button></div><div class="card-body"><p class="card-text"><a href="${
          element.link
        }">${element.link}</a></p></div></div>`
      );
    });
  });

  $(document).on('click', '.notes', function(event) {
    event.preventDefault();
    const thisId = $(this).attr('data-id');

    $.getJSON(`/api/articles/findArticleById/${thisId}`, res => {
      $('#noteModalTitle').text(`Notes For Article: ${res.title}`);
      $('#saveNoteButton').attr('data-id', thisId);
      //eslint-disable-next-line
      console.log(res.notes.length);
      if (res.notes.length === 0) {
        $('ul.savedNotes').append(
          '<li class="list-group-item">No Saved Notes</li>'
        );
      } else {
        //eslint-disable-next-line
        res.notes.forEach(note => {
          $('ul.savedNotes').append(
            //eslint-disable-next-line
            `<li class="list-group-item">${
              note.title
            }<button type="button" class="deleteNote" aria-label="Delete">
            <span aria-hidden="true">&times;</span>
          </button></li>`
          );
        });
      }
    });

    $('#notes').modal('show');
  });
});

$(document).on('click', '#saveNoteButton', function(event) {
  event.preventDefault();
  const addNote = (title, text) => {
    const thisId = $(this).attr('data-id');

    $.post(`/api/notes/${thisId}`, {
      title: title,
      body: text
    });
  };

  const newNoteTitle = $('#noteTitle')
    .val()
    .trim();
  const newNoteText = $('#noteText')
    .val()
    .trim();

  addNote(newNoteTitle, newNoteText);

  $('#noteTitle').val('');
  $('#noteText').val('');

  $('#noteSaved').modal('show');

  const thisId = $(this).attr('data-id');
  $.getJSON(`/api/articles/findArticleById/${thisId}`);
});

$('#noteSaved').on('hide', event => {
  event.preventDefault();
  location.reload();
});

$(document).on('click', '.delete', function(event) {
  event.preventDefault();
  const thisId = $(this).attr('data-id');

  $.ajax({
    method: 'PUT',
    url: `/api/articles/${thisId}/deleteSavedArticle`
  });

  $('#articleDeleted').modal('show');
  $(`div#${thisId}`).remove();
});
