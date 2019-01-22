$(document).ready(() => {
  $.getJSON('api/articles/true', data => {

    data.forEach(element => {

      $('#savedArticles').append(`<div id="${element._id}" class="card text-white bg-dark mb-3"><div class="card-header">${element.title}<button data-id="${element._id}" type="button" class="btn btn-outline-info float-right notes">Article Notes</button><button data-id="${element._id}" type="button" class="btn btn-outline-info float-right delete">Delete From Saved</button></div><div class="card-body"><p class="card-text"><a href="${element.link}">${element.link}</a></p></div></div>`);
    });
  });

});