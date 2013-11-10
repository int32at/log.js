(function() {
  log = window.log || {};
  
  log.common = function() {
    
    var self = this;

    var executeFunctionByName = function(callback, context/*, args*/) {
      var args = null;
      if (arguments.length == 3) args = arguments[2];
      var namespaces = callback.split(".");
      var func = namespaces.pop();
      for (var i = 0; i < namespaces.length; i++) {
          context = context[namespaces[i]];
      }
      var params = [];
      params.push(args);
      return context[func].apply(context, params);
    };

    return {

      executeCallback : function(callback) {
        var args = null;
        if (arguments.length == 2) args = arguments[1];
        if(typeof(callback) == 'function') {
            var params = [];
            params.push(args);
            callback.apply(this, params);
        } else {
            if (typeof callback !== "undefined" && callback.length > 0)
            executeFunctionByName(callback, window, args);
        }
      }
    };
  }();
}());