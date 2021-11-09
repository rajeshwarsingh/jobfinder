(function ($) {
  'use strict'
  let mapcount = 0
  function mainMap (locations) {
    if (typeof locations === 'object' && Object.keys(locations).length === 0) {
      locations = []

      const str = '' +
      '<a href="' + '#' + '" class="job-listing">' +
      '<div class="infoBox-close"><i class="icon-feather-x"></i></div>' +
      '<div class="job-listing-details">' +
      '<div class="job-listing-company-logo">' +
      '<div class="' + 0 + '-badge"></div>' +
      '<img src="' + '#' + '" alt="">' +
      '</div>' +
      '<div class="job-listing-description">' +
      '<h4 class="job-listing-company">' + 'Not Found' + '</h4>' +
      '<h3 class="job-listing-title">' + 'Not Found' + '</h3>' +
      '</div>' +
      '</div>' +
      '</a>'

      // locations[0] = [str, 0, 0, 6, ""]
      // locations[0] = [str, 37.788181, -122.461270, 5, '']
      locations[0] = [str, localStorage.getItem('lat'), localStorage.getItem('lng'), 5, '']
    }

    // Locations
    // ----------------------------------------------- //
    const ib = new InfoBox(locations)

    // Map Attributes
    // ----------------------------------------------- //

    const mapZoomAttr = $('#map').attr('data-map-zoom')
    const mapScrollAttr = $('#map').attr('data-map-scroll')

    if (typeof mapZoomAttr !== typeof undefined && mapZoomAttr !== false) {
      var zoomLevel = parseInt(mapZoomAttr)
    } else {
      var zoomLevel = 5
    }

    if (typeof mapScrollAttr !== typeof undefined && mapScrollAttr !== false) {
      var scrollEnabled = parseInt(mapScrollAttr)
    } else {
      var scrollEnabled = false
    }
    // console.log(typeof location, Array.isArray(locations), locations[0],locations[0][1], locations[0][2])
    // alert(locations[1])
    const currentLat = locations[0][1] || 0
    const currentLng = locations[0][2] || 0
    // Main Map
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoomLevel,
      scrollwheel: scrollEnabled,
      center: new google.maps.LatLng(currentLat, currentLng),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      panControl: false,
      navigationControl: false,
      streetViewControl: false,
      gestureHandling: 'cooperative',

      // Google Map Style
      styles: [{ featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#747474' }, { lightness: '23' }] }, { featureType: 'poi.attraction', elementType: 'geometry.fill', stylers: [{ color: '#f38eb0' }] }, { featureType: 'poi.government', elementType: 'geometry.fill', stylers: [{ color: '#ced7db' }] }, { featureType: 'poi.medical', elementType: 'geometry.fill', stylers: [{ color: '#ffa5a8' }] }, { featureType: 'poi.park', elementType: 'geometry.fill', stylers: [{ color: '#c7e5c8' }] }, { featureType: 'poi.place_of_worship', elementType: 'geometry.fill', stylers: [{ color: '#d6cbc7' }] }, { featureType: 'poi.school', elementType: 'geometry.fill', stylers: [{ color: '#c4c9e8' }] }, { featureType: 'poi.sports_complex', elementType: 'geometry.fill', stylers: [{ color: '#b1eaf1' }] }, { featureType: 'road', elementType: 'geometry', stylers: [{ lightness: '100' }] }, { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }, { lightness: '100' }] }, { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#ffd4a5' }] }, { featureType: 'road.arterial', elementType: 'geometry.fill', stylers: [{ color: '#ffe9d2' }] }, { featureType: 'road.local', elementType: 'all', stylers: [{ visibility: 'simplified' }] }, { featureType: 'road.local', elementType: 'geometry.fill', stylers: [{ weight: '3.00' }] }, { featureType: 'road.local', elementType: 'geometry.stroke', stylers: [{ weight: '0.30' }] }, { featureType: 'road.local', elementType: 'labels.text', stylers: [{ visibility: 'on' }] }, { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#747474' }, { lightness: '36' }] }, { featureType: 'road.local', elementType: 'labels.text.stroke', stylers: [{ color: '#e9e5dc' }, { lightness: '30' }] }, { featureType: 'transit.line', elementType: 'geometry', stylers: [{ visibility: 'on' }, { lightness: '100' }] }, { featureType: 'water', elementType: 'all', stylers: [{ color: '#d2e7f7' }] }]

    })

    // Infobox
    // ----------------------------------------------- //

    const boxText = document.createElement('div')
    boxText.className = 'map-box'

    let currentInfobox

    const boxOptions = {
      content: boxText,
      disableAutoPan: false,
      alignBottom: true,
      maxWidth: 0,
      pixelOffset: new google.maps.Size(-160, 0),
      zIndex: null,
      boxStyle: {
        width: '320px'
      },
      closeBoxMargin: '0',
      closeBoxURL: '',
      infoBoxClearance: new google.maps.Size(25, 25),
      isHidden: false,
      pane: 'floatPane',
      enableEventPropagation: false
    }

    var markerCluster, overlay, i
    const allMarkers = []

    const clusterStyles = [
      {
        textColor: 'white',
        url: '',
        height: 50,
        width: 50
      }
    ]

    let markerIco
    for (i = 0; i < locations.length; i++) {
      markerIco = locations[i][4]

      const overlaypositions = new google.maps.LatLng(locations[i][1], locations[i][2])

      var overlay = new CustomMarker(
        overlaypositions,
        map,
        {
          marker_id: i
        },
        markerIco
      )

      allMarkers.push(overlay)

      google.maps.event.addDomListener(overlay, 'click', (function (overlay, i) {
        return function () {
          ib.setOptions(boxOptions)
          boxText.innerHTML = locations[i][0]
          ib.close()
          ib.open(map, overlay)
          currentInfobox = locations[i][3]

          google.maps.event.addListener(ib, 'domready', function () {
            $('.infoBox-close').click(function (e) {
              e.preventDefault()
              ib.close()
              $('.map-marker-container').removeClass('clicked infoBox-opened')
            })
          })
        }
      })(overlay, i))
    }

    // Marker Clusterer Init
    // ----------------------------------------------- //

    const options = {
      imagePath: 'images/',
      styles: clusterStyles,
      minClusterSize: 3
    }

    markerCluster = new MarkerClusterer(map, allMarkers, options)

    google.maps.event.addDomListener(window, 'resize', function () {
      const center = map.getCenter()
      google.maps.event.trigger(map, 'resize')
      map.setCenter(center)
    })

    // Custom User Interface Elements
    // ----------------------------------------------- //

    // Custom Zoom-In and Zoom-Out Buttons
    const zoomControlDiv = document.createElement('div')
    const zoomControl = new ZoomControl(zoomControlDiv, map)

    function ZoomControl (controlDiv, map) {
      zoomControlDiv.index = 1
      map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv)
      // Creating divs & styles for custom zoom control
      controlDiv.style.padding = '5px'
      controlDiv.className = 'zoomControlWrapper'

      // Set CSS for the control wrapper
      const controlWrapper = document.createElement('div')
      controlDiv.appendChild(controlWrapper)

      // Set CSS for the zoomIn
      const zoomInButton = document.createElement('div')
      zoomInButton.className = 'custom-zoom-in'
      controlWrapper.appendChild(zoomInButton)

      // Set CSS for the zoomOut
      const zoomOutButton = document.createElement('div')
      zoomOutButton.className = 'custom-zoom-out'
      controlWrapper.appendChild(zoomOutButton)

      // Setup the click event listener - zoomIn
      google.maps.event.addDomListener(zoomInButton, 'click', function () {
        map.setZoom(map.getZoom() + 1)
      })

      // Setup the click event listener - zoomOut
      google.maps.event.addDomListener(zoomOutButton, 'click', function () {
        map.setZoom(map.getZoom() - 1)
      })
    }

    // Geo Location Button
    $('#geoLocation, .input-with-icon.location a').click(function (e) {
      e.preventDefault()
      geolocate()
    })

    function geolocate () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
          map.setCenter(pos)
          map.setZoom(12)
        })
      }
    }
  }
  //   $('#myInput').click(function(){
  //     alert('inputaaaa')
  // })
  const $input = $('#myInput')

  $input.on('click', function () {
    // alert($("#myInput").val())
  //   alert($(this).val());
  // });

    // $('#change').click(function () {
    //   alert('input1')
    //   // Change the value and trigger input
    //   $input.val($input.val() + 'x').trigger("input");
    // });

    // var $input = $("#myInput");

    // $input.on('input', function () {
    // $("#myInput").on('showServiceBtn', function () {
    // $('#showServiceBtn').click(function () {
    // $("#myBtn").click(function () {
    // $("#myInput").change(function(){
    const locationListArr = $('#myInput').val()

    mapcount++
    // alert('inside', mapcount, locationListArr)
    const locationListArrNew = $.parseJSON(locationListArr)

    const locations = Object.values(locationListArrNew).map(item => {
      return ([locationData(item.pagename, item.imageUrl, item.title, item.description, item.status), item.lat, item.lng, item.count, ''])
    })

    function locationData (jobURL, companyLogo, companyName, jobTitle, verifiedBadge) {
      return ('' +
        '<a href="' + jobURL + '" class="job-listing">' +
        '<div class="infoBox-close"><i class="icon-feather-x"></i></div>' +
        '<div class="job-listing-details">' +
        '<div class="job-listing-company-logo">' +
        '<div class="' + verifiedBadge + '-badge"></div>' +
        '<img src="' + companyLogo + '" alt="">' +
        '</div>' +
        '<div class="job-listing-description">' +
        '<h4 class="job-listing-company">' + companyName + '</h4>' +
        '<h3 class="job-listing-title">' + jobTitle + '</h3>' +
        '</div>' +
        '</div>' +
        '</a>')
    }

    const map = document.getElementById('map')
    if (typeof (map) !== 'undefined' && map != null) {
      console.log('check locations: ', locations[0])
      google.maps.event.addDomListener(window, 'load', mainMap(locations))
    }
  })

  // $(window).load(function() {
  $(document).ready(function () {
    const locationListArr = $('#myInput').val()
    // alert(locationListArr);

    //   var locationListArr = $("#myInput").val();

    mapcount++
    // alert('inside', mapcount, locationListArr)
    const locationListArrNew = $.parseJSON(locationListArr)

    const locations = Object.values(locationListArrNew).map(item => {
      return ([locationData(item.pagename, item.imageUrl, item.title, item.description, item.status), item.lat, item.lng, item.count, ''])
      // return ([locationData(item.pagename, item.imageUrl, item.title, item.description, item.status), item.lat, item.lng, item.count, ''])
    })

    function locationData (jobURL, companyLogo, companyName, jobTitle, verifiedBadge) {
      return ('' +
        '<a href="' + jobURL + '" class="job-listing">' +
        '<div class="infoBox-close"><i class="icon-feather-x"></i></div>' +
        '<div class="job-listing-details">' +
        '<div class="job-listing-company-logo">' +
        '<div class="' + verifiedBadge + '-badge"></div>' +
        '<img src="' + companyLogo + '" alt="">' +
        '</div>' +
        '<div class="job-listing-description">' +
        '<h4 class="job-listing-company">' + companyName + '</h4>' +
        '<h3 class="job-listing-title">' + jobTitle + '</h3>' +
        '</div>' +
        '</div>' +
        '</a>')
    }

    const map = document.getElementById('map')
    if (typeof (map) !== 'undefined' && map != null) {
      google.maps.event.addDomListener(window, 'load', mainMap(locations))
    }
  })
  // ---------------- Main Map / End ---------------- //

  // var loc = [ ''+
  // '<a href="'+'#'+'" class="job-listing">'+
  //    '<div class="infoBox-close"><i class="icon-feather-x"></i></div>'+
  //    '<div class="job-listing-details">'+
  //       '<div class="job-listing-company-logo">'+
  //         '<div class="'+true+'-badge"></div>'+
  //         '<img src="'+'#'+'" alt="">'+
  //       '</div>'+
  //       '<div class="job-listing-description">'+
  //         '<h4 class="job-listing-company">'+'no data'+'</h4>'+
  //         '<h3 class="job-listing-title">'+'No title'+'</h3>'+
  //       '</div>'+
  //    '</div>'+
  // '</a>',  -34.397, 150.644, 0, '']
  // // Map Init

  // if(mapcount<1){
  //   alert(mapcount)
  //   var map =  document.getElementById('map');
  //   if (typeof(map) != 'undefined' && map != null) {
  //     google.maps.event.addDomListener(window, 'load',  mainMap(loc));
  //   }
  // }

  // Single Listing Map
  // ----------------------------------------------- //

  function singleListingMap () {
    const myLatlng = new google.maps.LatLng({ lng: $('#singleListingMap').data('longitude'), lat: $('#singleListingMap').data('latitude') })

    const single_map = new google.maps.Map(document.getElementById('singleListingMap'), {
      zoom: 15,
      center: myLatlng,
      scrollwheel: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      panControl: false,
      navigationControl: false,
      streetViewControl: false,
      styles: [{ featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#747474' }, { lightness: '23' }] }, { featureType: 'poi.attraction', elementType: 'geometry.fill', stylers: [{ color: '#f38eb0' }] }, { featureType: 'poi.government', elementType: 'geometry.fill', stylers: [{ color: '#ced7db' }] }, { featureType: 'poi.medical', elementType: 'geometry.fill', stylers: [{ color: '#ffa5a8' }] }, { featureType: 'poi.park', elementType: 'geometry.fill', stylers: [{ color: '#c7e5c8' }] }, { featureType: 'poi.place_of_worship', elementType: 'geometry.fill', stylers: [{ color: '#d6cbc7' }] }, { featureType: 'poi.school', elementType: 'geometry.fill', stylers: [{ color: '#c4c9e8' }] }, { featureType: 'poi.sports_complex', elementType: 'geometry.fill', stylers: [{ color: '#b1eaf1' }] }, { featureType: 'road', elementType: 'geometry', stylers: [{ lightness: '100' }] }, { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }, { lightness: '100' }] }, { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#ffd4a5' }] }, { featureType: 'road.arterial', elementType: 'geometry.fill', stylers: [{ color: '#ffe9d2' }] }, { featureType: 'road.local', elementType: 'all', stylers: [{ visibility: 'simplified' }] }, { featureType: 'road.local', elementType: 'geometry.fill', stylers: [{ weight: '3.00' }] }, { featureType: 'road.local', elementType: 'geometry.stroke', stylers: [{ weight: '0.30' }] }, { featureType: 'road.local', elementType: 'labels.text', stylers: [{ visibility: 'on' }] }, { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#747474' }, { lightness: '36' }] }, { featureType: 'road.local', elementType: 'labels.text.stroke', stylers: [{ color: '#e9e5dc' }, { lightness: '30' }] }, { featureType: 'transit.line', elementType: 'geometry', stylers: [{ visibility: 'on' }, { lightness: '100' }] }, { featureType: 'water', elementType: 'all', stylers: [{ color: '#d2e7f7' }] }]
    })

    // Steet View Button
    $('#streetView').click(function (e) {
      e.preventDefault()
      single_map.getStreetView().setOptions({ visible: true, position: myLatlng })
      // $(this).css('display', 'none')
    })

    // Custom zoom buttons
    const zoomControlDiv = document.createElement('div')
    const zoomControl = new ZoomControl(zoomControlDiv, single_map)

    function ZoomControl (controlDiv, single_map) {
      zoomControlDiv.index = 1
      single_map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv)

      controlDiv.style.padding = '5px'

      const controlWrapper = document.createElement('div')
      controlDiv.appendChild(controlWrapper)

      const zoomInButton = document.createElement('div')
      zoomInButton.className = 'custom-zoom-in'
      controlWrapper.appendChild(zoomInButton)

      const zoomOutButton = document.createElement('div')
      zoomOutButton.className = 'custom-zoom-out'
      controlWrapper.appendChild(zoomOutButton)

      google.maps.event.addDomListener(zoomInButton, 'click', function () {
        single_map.setZoom(single_map.getZoom() + 1)
      })

      google.maps.event.addDomListener(zoomOutButton, 'click', function () {
        single_map.setZoom(single_map.getZoom() - 1)
      })
    }

    // Marker
    const singleMapIco = "<i class='" + $('#singleListingMap').data('map-icon') + "'></i>"

    new CustomMarker(
      myLatlng,
      single_map,
      {
        marker_id: '1'
      },
      singleMapIco
    )
  }

  // Single Listing Map Init
  const single_map = document.getElementById('singleListingMap')
  if (typeof (single_map) !== 'undefined' && single_map != null) {
    google.maps.event.addDomListener(window, 'load', singleListingMap)
  }

  // -------------- Single Listing Map / End -------------- //

  // Custom Map Marker
  // ----------------------------------------------- //

  function CustomMarker (latlng, map, args, markerIco) {
    this.latlng = latlng
    this.args = args
    this.markerIco = markerIco
    this.setMap(map)
  }

  CustomMarker.prototype = new google.maps.OverlayView()

  CustomMarker.prototype.draw = function () {
    const self = this

    let div = this.div

    if (!div) {
      div = this.div = document.createElement('div')
      div.className = 'map-marker-container'

      div.innerHTML = '<div class="marker-container">' +
        '<div class="marker-card">' +
        '</div>' +
        '</div>'

      // Clicked marker highlight
      google.maps.event.addDomListener(div, 'click', function (event) {
        $('.map-marker-container').removeClass('clicked infoBox-opened')
        google.maps.event.trigger(self, 'click')
        $(this).addClass('clicked infoBox-opened')
      })

      if (typeof (self.args.marker_id) !== 'undefined') {
        div.dataset.marker_id = self.args.marker_id
      }

      const panes = this.getPanes()
      panes.overlayImage.appendChild(div)
    }

    const point = this.getProjection().fromLatLngToDivPixel(this.latlng)

    if (point) {
      div.style.left = (point.x) + 'px'
      div.style.top = (point.y) + 'px'
    }
  }

  CustomMarker.prototype.remove = function () {
    if (this.div) {
      this.div.parentNode.removeChild(this.div)
      this.div = null; $(this).removeClass('clicked')
    }
  }

  CustomMarker.prototype.getPosition = function () { return this.latlng }

  // -------------- Custom Map Marker / End -------------- //
})(this.jQuery)
