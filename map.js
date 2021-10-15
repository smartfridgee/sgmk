//map init
var locationsMap = L.map('map-container').setView([53.4285, 14.5528], 12);

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(locationsMap);

//add markers and options
let opt_gropus = [];
let markers = [];
let i = 0;
const select = document.getElementById('select');

places.forEach(item => {
    if(opt_gropus.find(element => element === item.grp) === undefined){
        opt_gropus.push(item.grp);
        let group = document.createElement('optgroup');
        group.setAttribute("label", item.grp);
        select.appendChild(group);
    }

    let option = document.createElement('option');
    option.innerText = item.name;
    option.value = i;

    let opt_grp = select.querySelectorAll('optgroup');
    opt_grp.forEach(el => {
        if(el.label === item.grp){
            el.appendChild(option);
        }
    })

    var marker = L.marker([item.lat, item.long]).addTo(locationsMap);
    marker.bindPopup(`<h2>${item.name}</h2><hr><p>${item.comment}</p><img src="${item.img}" style="width: 100%"; height: 10rem; object-fit: cover;>`);
    markers.push(marker);
    i++
});

const selectPlace = () => {
    selection = select.value;
    if(selection === "null") { return 0; }
    locationsMap.flyTo(markers[selection].getLatLng(),14);
    markers[selection].openPopup();
}