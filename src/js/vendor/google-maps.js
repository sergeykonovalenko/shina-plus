function initMap() {

    let myMap;
    let element = document.getElementById('google-map');

    if (element) {

        let options = {
            zoom: 17,
            center: {lat:46.569443, lng:30.791400},
            scrollwheel: false
        };

        // maps initialization
        myMap = new google.maps.Map(element, options);

        // marker and info-window
        let marker = new google.maps.Marker({
            position: {lat:46.569443, lng:30.791400},
            map: myMap,
            animation: google.maps.Animation.DROP,
        });

        let InfoWindow = new google.maps.InfoWindow({
            content: `<div class="info-window">
                          <img class="info-window__img" src="${templateUrl}/img/base/marker-img.jpg" alt="">
                          <p class="info-window__title">ШинаПлюс</p>
                          <p class="info-window__subtitle">интернет магазин по продаже шин и дисков в Одессе и Украине</p>
                          <a class="info-window__phone" href="+380503901419">+38 (050) 390 14 19</a>
                      </div>`
        });

        marker.addListener('click', function () {
            InfoWindow.open(myMap, marker);
        });
    }
}
