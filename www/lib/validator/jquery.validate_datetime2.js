;(function($) {

  var ryear = /^-?\d{4}$/;
  var rdigit = /^\d+$/;
  var rmonth_year = /^([^-]+)\-(\d{4})$/;
  var ryear_month = /^(\d{4})\-([^-]+)$/;
  var rymd = /[^ymd]/;

  // mql lang ids ==> $.datepicker regional codes
  var REGIONS = { "/lang/en": "", "/lang/en-gb": "en-GB", "/lang/fr": "fr", "/lang/it": "it", "/lang/de": "de", "/lang/es": "es", "/lang/nl": "nl", "/lang/zh": "zh-CN", "/lang/zh-hant": "zh-TW", "/lang/ja": "ja", "/lang/ko": "ko", "/lang/pt-br": "pt-BR", "/lang/ru": "ru", "/lang/pl": "pl", "/lang/tr": "tr", "/lang/th": "th", "/lang/ar": "ar", "/lang/sv": "sv", "/lang/fi": "fi", "/lang/da": "da", "/lang/pt-pt": "pt", "/lang/ro": "ro", "/lang/hu": "hu", "/lang/iw": "he", "/lang/id": "id", "/lang/cs": "cs", "/lang/el": "el", "/lang/no": "no", "/lang/vi": "vi", "/lang/bg": "bg", "/lang/hr": "hr", "/lang/lt": "lt", "/lang/sk": "sk", "/lang/sl": "sl", "/lang/sr": "sr", "/lang/ca": "ca", "/lang/lv": "lv", "/lang/uk": "uk", "/lang/fa": "fa" };

  // $.datepicker regions that do not exist, so we just default them to a similar region
  REGIONS["/lang/fil"] = "";      // en
  REGIONS["/lang/hi"] = "";       // en
  REGIONS["/lang/es-419"] = "es"; // es

  var ymd_formats = {
    yymmdd: [
      "yy-m-d",
      "yy-m-dd",
      "yy-mm-d",
      "yy-mm-dd",
      "yy-M-d",
      "yy-M-dd",
      "yy-MM-d",
      "yy-MM-dd"
    ],
    ddmmyy: [
      "d-m-yy",
      "dd-m-yy",
      "d-mm-yy",
      "dd-mm-yy",
      "d-M-yy",
      "dd-M-yy",
      "d-MM-yy",
      "dd-MM-yy"
    ],
    mmddyy: [
      "m-d-yy",
      "m-dd-yy",
      "mm-d-yy",
      "mm-dd-yy",
      "M-d-yy",
      "M-dd-yy",
      "MM-d-yy",
      "MM-dd-yy"
    ]
  };

  function toInt(i) {
    return parseInt((""+i).replace(/^0+/g, ""));
  };

  $.datepicker.validator = function(lang_id) {
    var log = $.datepicker.validator.log;

    var regional = $.datepicker.validator.regional(lang_id);
    var month_names = [];    // month names (e.g., january, jan, etc.)
    var month_map = {};      // month name => month number (1-12)
    var format_parts = regional.dateFormat.split(/[^ymd]/);
    var ymd_format = format_parts.join(""); // @see ymd_formats
    var ymd_format_order = [];
    $.each(ymd_formats, function(k) {
      if (k === ymd_format) { // $.datepicker.regional.dateFormat is first
        ymd_format_order.unshift(k);
      }
      else {
        ymd_format_order.push(k);
      }
    });

    var delimiter = regional.dateFormat.replace(/[ymd]/g, "").split("")[0];

    $.each([regional.monthNamesShort,
            regional.monthNames], function(i, names) {
      if (!rdigit.test(names[0])) {
        $.each(names, function(j, name) {
          name = name.toLowerCase();
          if (!month_map[name]) {
            month_names.push(name);
            month_map[name] = j+1; // 1-12
          }
        });
      }
    });

    // reverse month name lookup so we match things like 十一 before 十 (zh-CN)
    // also, some months contain "." so we need to escape it in our RegExp.
    var rmonth_names = month_names.reverse().join("|").replace(/([\.])/g, "\\$1");
    var rdateparts = new RegExp("\\d+|" + rmonth_names, "gi");

    function dateparts(val) {
      var parts = [];
      val.replace(rdateparts, function(m) {
        parts.push(m);
      });
      return parts;
    };

    function _year(y) {
      return {text:y, value:y, date:new Date(y, 0)};
    };

    function _year_month(y, m) {
      try {
        log("_year_month(before)", y, m);
        m = month_map[m] || toInt(m);
        log("_year_month(after)", y, m);
        var check = regional.monthNames[m-1]; // check it's valid month number
      }
      catch (ex) {
        throw ("Invalid month: " + m);
      }
      var d = new Date(y, m-1);
      m = $.datepicker.validator.pad(m);
      var value = $.datepicker.validator._format(["yy", "mm"], "-", y, m);
      var text = $.datepicker.validator._format(format_parts, delimiter, y, m);
      return {text:text, value:value, date:d};
    };

    return function(val) {
      //
      // year?
      //
      if (ryear.test(val)) {
        return _year(val);
      }

      var parts = dateparts(val).join("-");
      log("normalized", parts);

      //
      // year+month?
      //
      var match = rmonth_year.exec(parts);

      if (match) {
        return _year_month(match[2], match[1].toLowerCase());
      }
      else {
        match = ryear_month.exec(parts);
        if (match) {
          return _year_month(match[1], match[2].toLowerCase());
        }
      }

      //
      // year+month+day?
      //
      for (var i=0,l=ymd_format_order.length; i<l; i++) {
        var formats = ymd_formats[ymd_format_order[i]];
        for (var j=0,l2=formats.length; j<l2; j++) {
          var format = formats[j];
          var date;
          try {
            date = $.datepicker.parseDate(format, parts, regional);
          }
          catch (ex) {
            //log("$.datepicker.parseDate error", format, parts, ex);
            // ignore and continue
          }
          if (date) {
            return {
              text: $.datepicker.formatDate(regional.dateFormat, date, regional),
              value: $.datepicker.formatDate("yy-mm-dd", date, regional)
            };
          }
        }
      }
      throw "Unrecoginzed datetime: " + val;
    };
  };

  $.datepicker.validator.regional = function(lang_id) {
    var region = REGIONS[lang_id];
    if (region == null) {
      console.warn("$.datepicker region not available for", lang_id);
      region = REGIONS["/lang/en"];
    }
    var regional = $.datepicker.regional[region] || $.datepicker.regional[''];
    if (!regional) {
      throw "$.datepicker region not found: " + region;
    }
    return regional;
  };

  $.datepicker.validator.pad = function(i) {
    i = toInt(i);
    return i < 10 ? "0" + i : "" + i;
  };

  $.datepicker.validator.format = function(dateFormat, y, m, d) {
    var format_parts = dateFormat.split(/[^ymd]/);
    var delimiter = dateFormat.replace(/[ymd]/g, "").split("")[0];
    return $.datepicker.validator._format(format_parts, delimiter, y, m, d);
  };

  $.datepicker.validator._format = function(format_parts, delimiter, y, m, d) {
    var parts = [];
    $.each(format_parts, function(i, f) {
      if (f === "yy") {
        if (y != null) {
          parts.push(y);
        }
      }
      else if (f === "mm") {
        if (m != null) {
          parts.push(m);
        }
      }
      else if (f === "dd") {
        if (d != null) {
          parts.push(d);
        }
      }
    });
    return parts.join(delimiter);
  };

  $.datepicker.validator.log = function() {
    //console.log.apply(null, arguments);
  };

})(jQuery);
