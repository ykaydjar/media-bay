import React, {Component, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';
import cheerio from 'cheerio';

import {getMediaItems} from "../../pages/api/get_media_items";
import {getMediaItemsData} from "../../pages/api/get_media_items_data";

export async function getAllItemsIds(){
    const items = await getMediaItems();

    return items.map((item, index) => {
        //console.log('Item: ' + JSON.stringify(item));
        return {
            params: {
                id: item.id,
            }
        }
    })
}

export async function getItemsData(id, url){
    const items = await getMediaItems();
    let currentItem = items.find(x => x.id === id);

    console.log('Get Data Function.url: ' + currentItem.url);
    await getMediaItemsData(currentItem.url).then(async (itemData) => {
        currentItem.description = {
            ...currentItem.description,
            ...itemData.description,
        }

        await getMovieTranslations(currentItem).then(async(itemData) => {
            currentItem = itemData;
            await getMovieData(currentItem.data.translations[0]).then((translation) => {
                console.log('Movie Translations: ' + JSON.stringify(translation));
                currentItem.data.translations[0] = translation;
            })
        })
    });
    //console.log('Get Data Function: ' + JSON.stringify(data));

    return {
        ...currentItem
    }
}

export async function getMovieTranslations(data){
    let itemData = data;

    try{
        await fetch(itemData.url).then((response) => {
            return response.text();
        }).then((text) => {
            const $ = cheerio.load(text);

            let translationsCount = $('.b-translators__list').children('li').length;
            console.log('Found ' + translationsCount + ' translations');

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
                console.log('Found ' + postInfoLength + ' post infos');

                for(let i=1; i<=postInfoLength; i++){
                    let postInfoRow = $('.b-post__info').children('tbody').children('tr:nth-child('+ i +')').children('td:nth-child(1)').find('h2').text();
                    console.log('Post Info Row: ' + postInfoRow);
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
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": `${itemData.referer}`,
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