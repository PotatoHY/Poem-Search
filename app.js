function split( val ) {
  return val.split( /,\s*/ );
}

function extractLast( term ) {
  return split( term ).pop();
}
 
function myAutoCompleteWidgetConstructor() {
  this._super();
  this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
};

function renderAutoCompleteMenuItem(ul, item) {
  terms = this.term.split(',');
  term = terms[terms.length - 1].trim();
  regex = new RegExp('(' + term + ')', 'gi');
  new_item = "<b>" + item.label.replace(regex, "<span style='color: blue'>$&</span>") + "</b>";
  return $("<li></li>").data("item.autocomplete", item).append("<a style='height:30px'>"
    + "<div style='width: 100%; float: left; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; text-align: left;'>"
    + new_item + "</div>"
    + "<div style='right: 0; position: relative; float: right; font-size: 11px; margin-top:-18px; color: #b3b3b3;'></div></a>").appendTo(ul);
};

function renderAutoCompleteMenu(ul, items) {
  var that = this, currentCategory = "";
  $.each(items, function(index, item) {
    var li;
    if (item.category != currentCategory) {
      ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
      currentCategory = item.category;
    }
    li = that._renderItemData(ul, item);
    if (item.category) {
      li.attr("aria-label", item.category + " : " + item.label);
    } else {
      li.attr("aria-label", "Uncategorized : " + item.label);
    }
  });
};

$.widget( "custom.customautocomplete", $.ui.autocomplete, {
  _create: myAutoCompleteWidgetConstructor,
  _renderItem: renderAutoCompleteMenuItem,
  _renderMenu: renderAutoCompleteMenu
});

var ajax_data = [];
$.ajax({
  url: 'https://webproject.cse.ust.hk:8046/get-json-cors.php',
  type: 'get',
  async: false,
  success: function(data) {
    ajax_data = data
  },
  error: function(error) {
    $('#error').text('Something went wrong');
  }
});

ajax_data.sort((a, b) => {
  if (a.category && b.category)
    return a.category.localeCompare(b.category);
  else if (!a.category)
    return 1;
  else
    return -1;
})

ajax_data.forEach((data, index) => {
  if (data.category == "" || !data.category) {
    data.category = "Uncategorized"
  }
})

function onDocumentReady() {
  $( "#search" ).customautocomplete({
    delay: 0,
    source: function( request, response ) {
      response($.ui.autocomplete.filter(ajax_data, extractLast(request.term)));
    },
    focus: function() {
      return false;
    },
    select: function(event, ui) {
      var terms = split( this.value );
      terms.pop();
      terms.push( ui.item.value );
      terms.push( "" );
      this.value = terms.join(", ");
      return false;
    }
  });
};

$( document ).ready(onDocumentReady);
