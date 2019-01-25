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

  $.getJSON(`/api/articles/findArticleWithNotesById/${thisId}`);
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
