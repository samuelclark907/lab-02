'use strict';

const keyWordArray = [];


function Horns(horns) {
  this.image_url = horns.image_url;
  this.description = horns.description;
  this.title = horns.title;
  this.horns = horns.horns;
  this.keyword = horns.keyword;
}

Horns.prototype.render = function () {
  let $hornClone = $('.photo-template').clone();
  $('main').append($hornClone);
  $hornClone.find('h2').text(this.title);
  $hornClone.find('img').attr('src', this.image_url);
  $hornClone.find('p').text(this.description);
  $hornClone.removeClass('photo-template');
  $hornClone.attr('class', this.keyword);
  $hornClone.css('display', 'block');
  keyWordArray.push(this.keyword);

};

Horns.readJson = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        let horn = new Horns(item);
        // console.log(horn);
        horn.render();
      });
    }).then(fillDropDown);
};



$(() => Horns.readJson());
function fillDropDown() {
  // console.log(keyWordArray);
  keyWordArray.sort();
  // console.log(keyWordArray);
  //foreach .includes no dupes if statement
  let removeDupe = keyWordArray.filter((item, i, arr) => arr.indexOf(item) === i);
  removeDupe.forEach(keyword => {
    let optionTag = `<option value = '${keyword}'>${keyword}</option>`;
    $('select').append(optionTag);
  });
}

$('select').on('change', function(e) {
  let $showAlike = `.${e.target.value}`;
  console.log($showAlike);
  $('section').show();
  $('section').not($showAlike).toggle('hide');
});
