import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react"; //causes compile error because of next.js specific.

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { ReactElement } from 'react'

library.add(fab, fas, far);

export default function App({Component, pageProps}) {
    return <Component {...pageProps}/>
}