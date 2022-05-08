#Introduction

---

A lightweight React component for reading QR codes from the web or mobile camera. 
It uses HTML canvas to capture images and uses jsQR library to detect QR codes in the image data.
<b>NOTE: HTTPS is required to use camera on mobile devices. However, you can test over localhost on your computer


#Install

---

npm i react-qrcode-scanner

#Example

---

```javascript
import React from 'react';
import {QrScanner} from "react-qrcode-scanner";

function App() {

    const handleScan = (value) => {
        console.log({value})
    }

    const handleError = (error) => {
        console.log({error})
    }

    return (
        <div className="App">
            <QrScanner
                onScan={handleScan}
                onError={handleError}

                /** Default props

                 onError = (error) => console.log({error}),
                 
                 onScan = (value) => console.log({value}),
                 
                 facingMode = 'environment', // environment|face
                 
                 constraints = null, //device constraints
                 
                 onLoad = (val :{mirrorVideo, streamLabel}) => null,
                 
                 flipHorizontally = false, //flip or reflect the video output based on facing mode
                 
                 style, //section styling can be added here
                 
                 className, //classnames will be added to the section wrapper
                 
                 delay = 800, //delay between each scan
                 
                 resolution = 600, //canvas resolution
                 
                 video = { //any valid JS-CSS can be added here
                           width: '50%',
                           height: '85%',
                       },
                       
                 showViewFinder = true,
                 
                 viewFinder = { //any valid JS-CSS can be added here
                           border: '12px solid rgba(255,255,255,0.3)',
                           position: 'absolute',
                           borderRadius: '5px',
                           width: '250px',
                           height: '250px'
                       }
                 */
            />
        </div>
    );
}

export default App;

```

#License

---

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.