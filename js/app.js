'use strict';

function Pics(img) {
    this.title = img.title;
    this.image_url = img.image_url;
    this.description = img.description;
    this.keyword = img.keyword;
    this.horns = img.horns;
}

Pics.prototype.render = function () {
    $('main').append(`
    <div class="a ${this.keyword}">
    <h4>${this.title}</h4>
    <img src="${this.image_url} ">
    <h5>${this.description}</h5>
    </div>`);
};

const keywordArray = [];
Pics.prototype.renderByKeyword = function () {
    console.log(keywordArray);
    keywordArray.forEach(item => {
        let $selectEl = $(`<option value=${item}>${item}</option>`);
        $('select').append($selectEl);
    });
};
$(document).ready(function () {

    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    let pictures;
    $.ajax('./data/page-1.json', ajaxSettings)
        .then(page => {
            page.forEach(item => {
                pictures = new Pics(item);
                if (!keywordArray.includes(pictures.keyword)) {
                    keywordArray.push(pictures.keyword);
                }
                pictures.render();

            });
            pictures.renderByKeyword();
        });

    $('#imgSelet').change(function () {
        if ($(this).val() === 'default') {
            $('.a').show();
        } else {
            $('.a').hide();
            $('.' + $(this).val()).show();
        }
    });

});
