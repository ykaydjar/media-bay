import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


library.add(fab, fas, far);

import '../styles/global.css';
import '../src/fonts/coolicons v2.3 WEBFONT/coolicons.css';

export default function App({Component, pageProps}) {
    return <Component {...pageProps}/>
}