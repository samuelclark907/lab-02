'use strict';

let keyWordArray = [];
let objArray = [];


function Horns(horns) {
  this.image_url = horns.image_url;
  this.description = horns.description;
  this.title = horns.title;
  this.horns = horns.horns;
  this.keyword = horns.keyword;
  objArray.push(this);
  keyWordArray.push(horns.keyword);
}
console.log(objArray);



// Horns.prototype.render = function () {
//   let $hornClone = $('.photo-template').clone();
//   $('main').append($hornClone);
//   $hornClone.find('h2').text(this.title);
//   $hornClone.find('img').attr('src', this.image_url);
//   $hornClone.find('p').text(this.description);
//   $hornClone.removeClass('photo-template');
//   $hornClone.attr('class', this.keyword);
//   $hornClone.css('display', 'block');
// keyWordArray.push(this.keyword);

// };

function renderItem(obj) {

  let templateObj = {
    title: obj.title,
    image_url: obj.image_url,
    description: obj.description
  };

  let $template = $('#template').html();
  let rendered = Mustache.render($template, templateObj);
  $('section').append(rendered);
}


renderItem(objArray);

Horns.readJson = () => {
  let template = $('#template').html();
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('data/page-2.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        let horn = new Horns(item);

        // console.log(horn);
        let mustRender = Mustache.render(template, horn);
        // horn.removeAttr('id');
        $('section').append(mustRender);
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

$('select').on('change', function (e) {
  let $showAlike = $(this).val();
  console.log($showAlike);
  let selectedKey = keyWordArray.filter((item) => item.keyword === $showAlike);
  if (selectedKey) {

    $('div').hide();
    $(`div.${selectedKey}`).fadeIn();
  }
  // $('div').hide();
  // $(`div.${selectedKey}`).fadeIn();
  // console.log(selectedKey);
  // $('section').show(selectedKey);
  // $('section').hide();

});
