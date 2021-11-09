/* ----------------- Start Document ----------------- */
$(document).ready(function () {
  // ----------------------------------------------- //
  // Nominatim Geocoder
  // ----------------------------------------------- //

  const geocoder = new L.Control.Geocoder.Nominatim()

  let output = []
  $('#autocomplete-input').attr('autocomplete', 'new-password').after('<div id="leaflet-geocode-cont"><ul></ul></div>')
  let liSelected
  let next

  // Autocomplete Tip
  if ($('#autocomplete-container').attr('data-autocomplete-tip') === undefined) {
    var autocompleteTip = 'type and hit enter'
  } else {
    var autocompleteTip = $('#autocomplete-container, .intro-search-field.with-autocomplete').attr('data-autocomplete-tip')
  }

  $('#autocomplete-container').after('<span class="type-and-hit-enter">' + autocompleteTip + '</span>')
  $('.intro-search-field.with-autocomplete').append('<span class="type-and-hit-enter">' + autocompleteTip + '</span>')

  // "TYPE AND HIT ENTER" tip displaying rules
  $('#autocomplete-input')
    .on('mouseover', function () {
      if ($(this).val().length < 10) {
        $('.type-and-hit-enter').addClass('tip-visible')
      }
    }).on('mouseout', function (e) {
      setTimeout(function () {
        $('.type-and-hit-enter').removeClass('tip-visible')
      }, 350)
    }).on('keyup', function (e) {
      if ($(this).val().length < 10) {
        $('.type-and-hit-enter').addClass('tip-visible')
      }
      if ($(this).val().length > 10) {
        $('.type-and-hit-enter').removeClass('tip-visible tip-visible-focusin')
      }

      if (e.which === 40 || e.which === 38) {

      } else {
        $('#leaflet-geocode-cont ul li.selected').removeClass('selected')
      }
    }).on('keydown', function (e) {
      const li = $('#leaflet-geocode-cont ul li')
      if (e.which === 40) {
        if (liSelected) {
          liSelected.removeClass('selected')
          next = liSelected.next()
          if (next.length > 0) {
            liSelected = next.addClass('selected')
          } else {
            liSelected = li.eq(0).addClass('selected')
          }
        } else {
          liSelected = li.eq(0).addClass('selected')
        }
      } else if (e.which === 38) {
        if (liSelected) {
          liSelected.removeClass('selected')
          next = liSelected.prev()
          if (next.length > 0) {
            liSelected = next.addClass('selected')
          } else {
            liSelected = li.last().addClass('selected')
          }
        } else {
          liSelected = li.last().addClass('selected')
        }
      }
    })

  $('#autocomplete-input').on('focusin', function () {
    if ($(this).val().length < 10) {
      $('.type-and-hit-enter').addClass('tip-visible-focusin')
    }
    if ($(this).val().length > 10) {
      $('.type-and-hit-enter').removeClass('tip-visible-focusin')
    }
  }).on('focusout', function () {
    setTimeout(function () {
      $('.type-and-hit-enter').removeClass('tip-visible tip-visible-focusin')
    }, 350)
    if ($(this).val() == 0) {
      $('div#listeo-listings-container').triggerHandler('update_results', [1, false])
    }
  })

  $('.location .fa-map-marker').on('mouseover', function () {
    $('.type-and-hit-enter').removeClass('tip-visible-focusin tip-visible')
  })

  let mouse_is_inside = false

  $('#autocomplete-input,#leaflet-geocode-cont').on('mouseenter', function () {
    mouse_is_inside = true
  })
  $('#autocomplete-input,#leaflet-geocode-cont').on('mouseleave', function () {
    mouse_is_inside = false
  })

  $('body').mouseup(function () {
    if (!mouse_is_inside) $('#leaflet-geocode-cont').removeClass('active')
  })

  // Displaying seearch predictions on arrow press
  $('#autocomplete-input').on('keydown', function search (e) {
    if (e.keyCode == 13) {
      if ($('#leaflet-geocode-cont ul li.selected').length > 0) {
        $('#leaflet-geocode-cont ul li.selected').trigger('click').removeClass('selected')

        return
      }
      const query = $(this).val()
      if (query) {
        geocoder.geocode(query, function (results) {
          for (let i = 0; i < results.length; i++) {
            output.push('<li data-latitude="' + results[i].center.lat + '" data-longitude="' + results[i].center.lng + '" >' + results[i].name + '</li>')
          }
          output.push('<li class="powered-by-osm">Powered by <strong>OpenStreetMap</strong></li>')
          $('#leaflet-geocode-cont ul').html(output)
          const txt_to_hl = query.split(' ')
          txt_to_hl.forEach(function (item) {
            $('#leaflet-geocode-cont ul').highlight(item)
          })
          $('#autocomplete-container').addClass('osm-dropdown-active')
          $('#leaflet-geocode-cont').addClass('active')
          output = []
        })
      }
    }
  })

  // Run search predictions on enter and go to selected location
  $('#autocomplete-container, .intro-search-field.with-autocomplete').on('click', '#leaflet-geocode-cont ul li', function (e) {
    $('#autocomplete-input').val($(this).text())
    $('#leaflet-geocode-cont').removeClass('active')
    $('#autocomplete-container').removeClass('osm-dropdown-active')

    const newLatLng = new L.LatLng($(this).data('latitude'), $(this).data('longitude'))
    if (document.getElementById('map') !== null && map) {
      map.flyTo(newLatLng, 10)
    }
  })

  if ($('#autocomplete-input').val()) {
    const query = $('#autocomplete-input').val()
    geocoder.geocode(query, function (results) {
      console.log(results[0].center)
      if (map) {
        map.flyTo(results[0].center, 10)
      }
    })
  }
})

// Highlighting Search Results
jQuery.fn.highlight = function (pat) {
  function innerHighlight (node, pat) {
    let skip = 0
    if (node.nodeType == 3) {
      const pos = node.data.toUpperCase().indexOf(pat)
      if (pos >= 0) {
        const spannode = document.createElement('span')
        spannode.className = 'highlight'
        const middlebit = node.splitText(pos)
        const endbit = middlebit.splitText(pat.length)
        const middleclone = middlebit.cloneNode(true)
        spannode.appendChild(middleclone)
        middlebit.parentNode.replaceChild(spannode, middlebit)
        skip = 1
      }
    } else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
      for (let i = 0; i < node.childNodes.length; ++i) {
        i += innerHighlight(node.childNodes[i], pat)
      }
    }
    return skip
  }
  return this.each(function () {
    innerHighlight(this, pat.toUpperCase())
  })
}

jQuery.fn.removeHighlight = function () {
  function newNormalize (node) {
    for (let i = 0, children = node.childNodes, nodeCount = children.length; i < nodeCount; i++) {
      const child = children[i]
      if (child.nodeType == 1) {
        newNormalize(child)
        continue
      }
      if (child.nodeType != 3) { continue }
      const next = child.nextSibling
      if (next == null || next.nodeType != 3) { continue }
      const combined_text = child.nodeValue + next.nodeValue
      new_node = node.ownerDocument.createTextNode(combined_text)
      node.insertBefore(new_node, child)
      node.removeChild(child)
      node.removeChild(next)
      i--
      nodeCount--
    }
  }

  return this.find('span.highlight').each(function () {
    const thisParent = this.parentNode
    thisParent.replaceChild(this.firstChild, this)
    newNormalize(thisParent)
  }).end()
}
