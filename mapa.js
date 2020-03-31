// jmeno	adresa	x	y	nakazeni_seniori	pracovnici	zemreli	pocet_klientu
const domovy = [
  ["Thomayerova nemocnice","Vídeňská 800, 140 59 Praha 4-Krč",14.4571778,50.0300714,24,"6",1,"27",""],
  ["Pražská Michle","Čapkova 13/400 140 00 Praha 4",14.4532408,50.0584583,6,"1",4,"70","údaje o nakažených k 26. 3."],
  ["Pražský Chodov","Donovalská 2222, 149 00 Praha 4-Chodov",14.5061369,50.0366181,15,"?",1,"260",""],
  ["Český Dub","Zámecká 39/IV, 463 43 Český Dub",14.9944492,50.6627850,0,"2",0,"94",""],
  ["Břevnice","Břevnice 54",15.6122483,49.6327447,20,"10",1,"22",""],
  ["Český Krumlov","Vyšehradská 260, 381 01 Český Krumlov",14.3173158,48.8181672,6,"4",0,"18",""],
  ["Litoměřice","U Trati 2041, 412 01 Litoměřice",14.1435703,50.5396508,52,"3",1,"65",""],
  ["Liberec","Domažlická 880/8, 460 10 Liberec 12-Františkov",15.0340733,50.7590903,2,"1",0,"200",""],
  ["Ostrava","Rybářská 13, 709 00, Ostrava-Mariánské Hory",18.2475114,49.8342731,0,"1",0,"není známo",""],
  ["Nemocnice svaté Alžběty","Na Slupi 448/1, 128 00 Nové Město",14.4203853,50.0692444,2,"2",0,"není známo","údaje o nakažených k 23. 3."]
]

const cWidth = d3.scaleSqrt().domain([0, Math.max( ...domovy.map(v => v[4]) )]).range([5, 20])
const map = L.map('korona_seniori')

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

const domLay = L.featureGroup()
domovy.forEach(dum => {
  const mrk = L.circleMarker([dum[3], dum[2]], {
    radius: cWidth(dum[4]),
    weight: 1,
    color: '#de2d26',
    fillCOlor: '#de2d26',
    fillOpacity: .5,
  })
  mrk.bindPopup(
    `<b>${dum[0]}</b>
    <br>Nakažení klienti: ${dum[4] + dum[5]}
    <br>Zesnulí (COVID-19): ${dum[6]}
    <br>Celkem klientů: ${dum[7]}
    <br>Nakažený personál: ${dum[5]}
    <br><i>${dum[8]}</i>`
  )
  mrk.addTo(domLay)
})

domLay.addTo(map)
map.fitBounds(domLay.getBounds())
