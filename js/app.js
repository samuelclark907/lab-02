'use strict';

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

};

Horns.readJson = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        let horn = new Horns(item);
        console.log(horn);
        horn.render();
      });
    });
};

$(() => Horns.readJson());



// let $section1 = document.getElementById('photo-template');
// let $img = document.getElementById('imgsrc');
// const imgArray = [];

// $.ajax('./page-1.json').then(data => {
//   data.forEach(horns => {
//     imgArray.push(horns);
//     console.log(horns);
    // let $newHorns = $img.clone();
    // $newHorns.attr('src', horns.image_url);
    // $img.append($newHorns);
    // $section1.append($img);


    //  console.log(horns);
    // console.log(horns.image_url);
    // console.log($newHorns);
//   });
// });


// let $newHorns = $img.clone();
//     $newHorns.find('h2').text(horns.title);
//     $newHorns.find('img').attr('src', image_url);