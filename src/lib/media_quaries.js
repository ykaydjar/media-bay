import React, {Component} from 'react';
import cheerio from 'cheerio';

export async function getMediaItems(host='rezka.ag', topic='films', page='1', filter='watching', limit='max'){
    let url = 'https://' + host + '/' + topic + '/page/' + page + '/?filter=' + filter;
    let mediaItemsResponse = [];

    try{
        await fetch(url).then((response) => {
            return response.text();
        }).then((text) => {
            const $ = cheerio.load(text);

            let itemCount = $('.b-content__inline_items').children('.b-content__inline_item').length;
            let fetchLimit  = null;

            if(limit === 'max'){
                fetchLimit = itemCount
            }else if(limit > itemCount){
                fetchLimit = itemCount;
            }else{
                fetchLimit = limit;
            }

            let itemType = null;
            if(topic.includes('films')){
                itemType = 'films';
            }else if(topic.includes('series')){
                itemType = 'series';
            }else if(topic.includes('cartoons')){
                itemType = 'cartoons';
            }else if(topic.includes('animation')){
                itemType = 'animation'
            }

            for(let i=1; i<=fetchLimit; i++){
                let itemObject = {
                    id: $('.b-content__inline_items').children('.b-content__inline_item:nth-child('+ i +')').attr('data-id'),
                    type: itemType,
                    source: 'hdrezka',
                    host: host,

                    url: $('.b-content__inline_items').children('.b-content__inline_item:nth-child('+ i +')').attr('data-url'),

                    description: {
                        name: $('.b-content__inline_items').children('.b-content__inline_item:nth-child('+ i +')').children('.b-content__inline_item-link').children('a').text().trim(),
                        nameOriginal: null,
                        subtext: $('.b-content__inline_items').children('.b-content__inline_item:nth-child('+ i +')').children('.b-content__inline_item-link').children('div').text().trim(),
                        about: null,

                        actors: null,
                        directors: null,

                        ratings: null,

                        elements: null,
                    },

                    data: null,

                    poster: null,
                }

                let poster = $('.b-content__inline_items').children('.b-content__inline_item:nth-child('+ i +')').children('.b-content__inline_item-cover').children('a').children('img').attr('src');
                if(poster.includes('http')){
                    itemObject.poster = poster;
                }else{
                    itemObject.poster = 'https://'+ host + $('.b-content__inline_items').children('.b-content__inline_item:nth-child('+ i +')').children('.b-content__inline_item-cover').children('a').children('img').attr('src');
                }

                mediaItemsResponse.push(itemObject);

                //console.log('Media Object: ' + JSON.stringify(itemObject));
                //console.log('--------------------------------------------');
            }
        });
        return mediaItemsResponse;
    }catch (e) {
        console.log(e);
    }
}

export async function getMediaItemsData(currentItem){
    console.log('URL: ' + currentItem.url);
    let itemData = currentItem;

    await fetch(itemData.url).then((response) => {
        return response.text();
    }).then((text) => {
        const $ = cheerio.load(text);

        itemData.poster = $('.b-sidecover').children('a').attr('href');

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

        if($('.b-post__info').find('.b-post__info_rates')){
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
        }


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



//movie data fetch
export async function getMovieTranslations(currentItem){
    let itemData = currentItem;

    try{
        await fetch(itemData.url).then((response) => {
            return response.text();
        }).then((text) => {
            const $ = cheerio.load(text);

            let translationsCount = $('.b-translators__list').children('li').length;
            //console.log('Found ' + translationsCount + ' translations');

            itemData.data = {
                translations: [],
            };

            if(translationsCount > 0) {
                for (let i = 1; i <= translationsCount; i++) {
                    let translationObject = {
                        translationID: $('.b-translators__list').children('li:nth-child(' + i + ')').attr('data-translator_id'),
                        translationTitle: $('.b-translators__list').children('li:nth-child(' + i + ')').attr('title'),

                        itemID: itemData.id,
                        referer: itemData.url,
                        host: itemData.host,

                        mediaFiles: null,
                    }

                    let itemExists = itemData.data.translations.findIndex(x => x.translationID === translationObject.translationID);
                    if(itemExists === -1){
                        itemData.data.translations.push(translationObject);
                    };
                }
            }else{
                let translationObject = {
                    translationID: null,
                    translationTitle: null,

                    itemID: itemData.id,
                    referer: itemData.url,
                    host: itemData.host,

                    mediaFiles: null,
                }

                let postInfoLength = $('.b-post__info').children('tbody').children('tr').length;
                //console.log('Found ' + postInfoLength + ' post infos');

                for(let i=1; i<=postInfoLength; i++){
                    let postInfoRow = $('.b-post__info').children('tbody').children('tr:nth-child('+ i +')').children('td:nth-child(1)').find('h2').text();
                    //console.log('Post Info Row: ' + postInfoRow);
                    if(postInfoRow === 'В переводе'){
                        translationObject.translationTitle = $('.b-post__info').children('tbody').children('tr:nth-child('+ i +')').children('td:nth-child(2)').text();
                    }
                }
                if(translationObject.translationTitle === null){
                    translationObject.translationTitle = 'Оригинал';
                }

                let scriptCount = $('script').length;

                for(let i=1; i<=scriptCount; i++) {
                    let mediaString = $('body').children('script:nth-child(' + i + ')').toString();
                    if (mediaString.includes('sof.tv.initCDN')) {
                        mediaString = mediaString.replace(/\s/g, "");
                        let startPointText = 'sof.tv.initCDNMoviesEvents(';
                        let startPoint = mediaString.indexOf(startPointText);

                        let endPointText = '{';
                        let endPoint = mediaString.indexOf(endPointText, startPoint);

                        let dataString = mediaString.slice(startPoint + startPointText.length, endPoint);

                        let firstComma = dataString.indexOf(',');
                        let secondComma = dataString.indexOf(',', firstComma+1);

                        translationObject.translationID = dataString.slice(firstComma+1, secondComma);
                    }
                }

                let itemExists = itemData.data.translations.findIndex(x => x.translationID === translationObject.translationID);
                if(itemExists === -1){
                    itemData.data.translations.push(translationObject);
                };
            }
        })
    }catch(e){
        console.log(e);
    }
    return itemData;
}
export async function getMovieData(translationObject){
    //media quality name can not be taken from file name in new video files as they are contain not quality name but random letters

    let itemData = translationObject;
    itemData.mediaFiles = [];


    try{
        await fetch("https://rezka.ag/ajax/get_cdn_series/", {
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,uk-UA;q=0.6,uk;q=0.5",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": `id=${itemData.itemID}&translator_id=${itemData.translationID}&is_camrip=0&is_ads=0&is_director=0&action=get_movie`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        }).then((response) => {
            return response.json();
        }).then((json) => {

            let mediaString = json.url.toString();

            mediaString = mediaString.replace(/\[/g, "");
            mediaString = mediaString.replace(/]/g, "");
            mediaString = mediaString.replace(/\s/g, "");
            //console.log('Substring: ' + mediaString);

            let mediaStringsArray = mediaString.split(",");
            //console.log('Media Strings Array: ' + JSON.stringify(mediaStringsArray));

            for(let i=0; i<=mediaStringsArray.length-1; i++){
                let qualityUrl = mediaStringsArray[i];
                //console.log('Selected url: ' + qualityUrl);

                let qualityDividerIndex = qualityUrl.search('or');

                if(qualityDividerIndex !== -1){
                    let qualityArray = qualityUrl.split('or');

                    qualityUrl = qualityArray.find(x => !x.includes(':hls:manifest.m3u8'));
                }

                let urlStart = qualityUrl.search('http');

                let qualityIdentifier = qualityUrl.slice(0, urlStart);
                //console.log('Quality Identifier: ' +qualityIdentifier);

                let mediaUrl = qualityUrl.replace(qualityIdentifier, '');
                //console.log('Media url: '+ mediaUrl);

                let mediaQualityArray = mediaUrl.split("/");
                //console.log('Media quality Array: ' + JSON.stringify(mediaQualityArray));

                let mediaQuality = mediaQualityArray[mediaQualityArray.length-1];
                //console.log('Media quality before: ' + mediaQuality);

                mediaQuality = mediaQuality.replace('.mp4', '');
                //console.log('Media quality after: ' + mediaQuality);

                let mediaObject = {
                    index: i,
                    mediaQuality: mediaQuality,
                    mediaUrl: mediaUrl,
                }

                itemData.mediaFiles.push(mediaObject);

                //console.log('Quality object: ' + JSON.stringify(mediaObject));
            }
        })
    }catch(e){
        console.log(e);
    }


    return itemData;
}