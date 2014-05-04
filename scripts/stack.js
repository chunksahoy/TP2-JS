var Stack = (function () {
      var instance;
      function ZeStack() {
          this.stack = [];
		  
		  this.addEvent = function(evt) {
				this.stack.push(evt);  
		  }
		  
		  this.undo = function (s) {
		   	   if(this.stack.length > 0) {
					var evt = this.stack.pop();
					alert(String.fromCharCode(evt.keyCode));
					alert(s);
			   }
		  };
      }			
      function createInstance() {
          var singleton = new ZeStack();
          return singleton;
      }
      return {
          getInstance : function() {
              if (!instance) {
                  instance = createInstance();
              }
              return instance;
          }	
      };
  })();