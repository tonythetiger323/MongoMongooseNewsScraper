/* eslint-disable indent */
$(document).ready(() => {
  //event for when Scrape New Articles Button is clicked
  $('#scrape').on('click', event => {
    event.preventDefault();

    $.getJSON('/api/scrape', scrapeResult => {
      if (scrapeResult.code === 'success') {
        $('#articlesScraped').modal('show');
        $('#noArticles').remove();

        $.getJSON('/api/articles', data => {
          data.forEach(element => {
            $('#articles').append(
              `<div id="${
                element._id
              }" class="card text-white bg-dark mb-3"><div class="card-header">${
                element.title
              }<button data-id="${
                element._id
              }" type="button" class="btn btn-outline-info float-right save">Save</button></div><div class="card-body">
              ${element.summary}
              <div class="card-footer">
              <p class="card-text"><a href="${element.link}">${
                element.link
              }</a></p></div></div>`
            );
          });
        });
      }
    });
  });

  $(document).on('click', '.save', function(event) {
    event.preventDefault();
    const thisId = $(this).attr('data-id');

    $.ajax({
      method: 'PUT',
      url: `api/articles/${thisId}/saveArticle`
    }).then($('#articleSaved').modal('show'), $(`#${thisId}`).remove());
  });
});
