async function setNations() {
    const response = await fetch('nations.json', {cache: "no-store"})
    const countryData = await response.json()
    const tipsyData = {
        arrowWidth: 10,
        attr: 'data-tipsy',
        cls: null,
        duration: 150,
        offset: 0,
        position: 'top-right',
        trigger: 'hover',
        onShow: null,
        onHide: null
    }

    document.querySelectorAll("path").forEach(function (island) {
        if (countryData[island.className.baseVal]) {
            var islandClass = island.className.baseVal;
            island.setAttribute("title", countryData[island.className.baseVal]['Country Name'])
            island.setAttribute("class", "hoverable")

            island.onclick = function () {
                document.getElementById("countrydesc").style.display = "block";
                var fullstr = ``;
                const country = countryData[islandClass];

                if (country.flag === false) {
                    document.getElementById('flag').src = '';
                    document.getElementById('flag').onclick = false

                    if (document.getElementById('object')) { document.getElementById('object').remove() };
                } else if (country.flag.includes('svg')) {
                    if (document.getElementById('object')) { document.getElementById('object').remove() };

                    let objectelem = document.createElement('object')
                    objectelem.type = 'image/svg+xml'
                    objectelem.data = country.flag
                    objectelem.id = 'object'
                    document.getElementById("imageContainer").prepend(objectelem)

                    document.getElementById('flag').src = '';
                    document.getElementById('flag').onclick = false
                } else {
                    document.getElementById('flag').src = country.flag;
                    document.getElementById('flag').onclick = function () { window.open(country.flag) }

                    if (document.getElementById('object')) { document.getElementById('object').remove() };
                }
                document.getElementById("countryName").innerHTML = '<a onclick="this.parentNode.parentNode.style.display = `none`" style="float: right;display: flex;justify-content: center;place-items: center;height: 32px;"><i class="fa-solid fa-xmark"></i></a>' + country['Country Name'];

                if (!country['news']) {
                    document.getElementById('newsholder').innerText = 'No news availible!'
                } else {
                    document.getElementById('newsholder').innerText = ''
                }

                if (country['map']) {
                    document.getElementById('map').style.display = 'block'
                    document.getElementById('map').onclick = function () { window.open(country['map']) }
                    document.getElementById('map').src = country['map']
                } else {
                    document.getElementById('map').style.display = 'none'
                }

                Object.keys(country).forEach(function (item, i) {
                    if (item == 'flag') return;
                    if (item == 'map') return;
                    if (item == 'FullBUMember') return;
                    if (item == 'news') {
                        Object.keys(country[item]).forEach(function (item, i) {
                            let newscard = document.createElement('div')
                            newscard.innerText = item
                            newscard.onclick = function () {
                                window.location.href = country['news'][item]
                            }
                            document.getElementById("newsholder").append(newscard)
                        })
                        return
                    }

                    var addcolon = ":"
                    var itemstr = item
                    var valuestr = country[item]
                    if (country[item] == "spacingElem") {
                        addcolon = ""
                        itemstr = ""
                        valuestr = ""
                    }
                    if (country[item] == "") {
                        addcolon = ""
                    }

                    let currline = `<b>${itemstr}</b>${addcolon} ${valuestr}<br>`;
                    fullstr += currline;
                });

                document.getElementById("desc").innerHTML = fullstr;
            }
        } else {
            island.setAttribute("title", "Unclaimed Territory")
        }

        $('path[title]').tipsy(tipsyData)
    });

}

setNations()