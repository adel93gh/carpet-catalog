const CACHE_NAME = "carpet-catalog-v3";


const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",

  "./images/cover.PNG",
  "./images/cover-blur.jpg",
  "./images/logo.png",
"./fonts/B Titr.ttf",
  "./fonts/B Nazanin Bold.ttf",
  "./fonts/B Titr Bold.ttf",
  "./fonts/B Nazanin.ttf"
];


const products = {

  bahar:["brown","gray","navyblue","choclate"],

  negar:["gray","whitegray"],

  gisu:["choclate","whitegray","gray","cream"],

  nur:["choclate","whitegray","gray","cream"],

  kasra:["choclate","gray","cream"],

  kajrah:["black","blue","gray","navyblue","zereshki"],

  kajrahdoubl:["creambrown","whiteblack","whitegray"],

  marmar:["cream"],

  makhmal:[
    "beige",
    "black",
    "brown",
    "choclate",
    "darkcream",
    "gray",
    "navyblue",
    "creambrown",
    "zereshki",
    "whiteblack",
    "blackwhite",
    "whitegray"
  ],

  tafting:[
    "whiteblack",
    "creambrown",
    "darkgray",
    "silver",
    "choclate",
    "smoky"
  ],

  shiba:[
    "gray",
    "cream",
    "whitegray",
    "choclate"
  ],

  golshan:[
    "gray",
    "cream",
    "whitegray",
    "choclate"
  ],

  miniatori:[
    "gray",
    "cream",
    "choclate"
  ],

  sahand:[
    "creambrown",
    "whiteblack",
    "whitegray"
  ],

  seramik:[
    "gray",
    "cream",
    "whitegray",
    "choclate"
  ],

  parket:[
    "gray",
    "cream",
    "whitegray",
    "choclate"
  ],

  sarv:[
    "gray",
    "creambrown",
    "whiteblack",
    "choclate",
    "black"
  ],

  raha:[
    "beige",
    "gray",
    "creambrown",
    "brown",
    "whiteblack",
    "whitegray",
    "black"
  ],

  matris:[
    "beige",
    "black",
    "gray",
    "creambrown",
    "brown",
    "navyblue",
    "whiteblack",
    "whitegray",
    "choclate"
  ],

  alvand:[
    "beige",
    "gray",
    "brown",
    "navyblue",
    "choclate"
  ]

};



// ساخت لیست فایل‌ها

Object.keys(products).forEach(product=>{


  // عکس اصلی محصول

  FILES_TO_CACHE.push(
    `./images/${product}.jpg`
  );


  products[product].forEach(color=>{


    // عکس محیطی

    FILES_TO_CACHE.push(
      `./images/${product}-room-${color}.PNG`
    );


    // عکس رنگ محصول

    FILES_TO_CACHE.push(
      `./images/${product}-${color}.jpg`
    );


  });


});




// نصب و ذخیره فایل‌ها

self.addEventListener("install", event=>{


event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>{


return Promise.all(

FILES_TO_CACHE.map(file=>{


return cache.add(file)
.catch(error=>{

console.log("Missing file:", file);

});


})


);


})


);


});





// فعال شدن نسخه جدید

self.addEventListener("activate", event=>{


event.waitUntil(

caches.keys()

.then(keys=>{


return Promise.all(

keys.map(key=>{


if(key !== CACHE_NAME){

return caches.delete(key);

}


})


);


})


);


});





// استفاده از کش هنگام باز کردن

self.addEventListener("fetch", event=>{


event.respondWith(

caches.match(event.request)

.then(response=>{


return response || fetch(event.request);


})


);


});