import React, {Component} from 'react';
import cheerio from 'cheerio';


export async function getMediaItemsData(url){
    console.log('URL: ' + url);
    let itemData = {
        description: {
            nameOriginal: null,
            about: null,
            directors: null,
            actors: null,
            ratings: null,
            elements: null,
        }
    };

    await fetch(url).then((response) => {
        return response.text();
    }).then((text) => {
        const $ = cheerio.load(text);

        itemData.description.nameOriginal = $('.b-post__origtitle').text();
        itemData.description.about = $('.b-post__description_text').text();


        let personsCount = $('.persons-list-holder').children('.item').length;
        itemData.description.directors = [];
        itemData.description.actors = [];

        for(let i=1; i<=personsCount; i++){
            let personType = $('.persons-list-holder').children('.item:nth-child('+ i +')').children('span').attr('itemprop');
            if(personType === 'director'){
                let directorObject = {
                    directorName: $('.persons-list-holder').children('.item:nth-child('+ i +')').children('span').children('a').children('span').text(),
                    directorUrl: $('.persons-list-holder').children('.item:nth-child('+ i +')').children('span').children('a').attr('href'),
                }

                itemData.description.directors.push(directorObject);
            }else if(personType === 'actor'){
                let actorObject = {
                    actorName: $('.persons-list-holder').children('.item:nth-child('+ i +')').children('span').children('a').children('span').text(),
                    actorUrl: $('.persons-list-holder').children('.item:nth-child('+ i +')').children('span').children('a').attr('href'),
                }

                itemData.description.actors.push(actorObject);
            }
        }

        let ratingsCount = $('.b-post__info').find('.b-post__info_rates').length;
        itemData.description.ratings = [];

        for(let i=1; i<=ratingsCount; i++){
            let ratingObject = {
                ratingUrl: $('.b-post__info').find('.b-post__info_rates:nth-child('+ i +')').children('a').attr('href'),
                ratingName: $('.b-post__info').find('.b-post__info_rates:nth-child('+ i +')').children('a').text(),
                ratingValue: $('.b-post__info').find('.b-post__info_rates:nth-child('+ i +')').children('span').text(),
                ratingVoters: $('.b-post__info').find('.b-post__info_rates:nth-child('+ i +')').children('i').text(),
            }

            //rating name not always displayed because in some items rating has no url(RoboCop). Check if rating name is not empty and if it is - get name from class or from first child of parent component.

            itemData.description.ratings.push(ratingObject);
        }

        let hdrezkaRating = {
            ratingName: 'hdrezka',
            ratingValue: $(`#rating-layer-num-${itemData.id}`).text(),
            ratingVoters: $('.b-post__rating').children('.votes').children('span').text(),
        };
        console.log('HDREZKA Ratings: ' + JSON.stringify(hdrezkaRating));
        itemData.description.ratings.push(hdrezkaRating);

        let isSeries = $('#simple-episodes-tabs').children('ul').length;
        console.log('IS SERIES: ' + isSeries);
        if(isSeries <= 0){
            itemData.description.elements = 'single';
            console.log('is Film!');
        }else{
            itemData.description.elements = 'multiple';
            console.log('is Series!');
        }

    })

    return itemData;
}
