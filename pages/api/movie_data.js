import React, {Component} from 'react';
import cheerio from 'cheerio';

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