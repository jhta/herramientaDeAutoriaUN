
          (function () {
           var QUEUE = MathJax.Hub.queue;
           var math = null;
           QUEUE.Push(function () {
             math = MathJax.Hub.getAllJax("previsualizar")[0];
           });
           window.UpdateMath = function (MathML) {
             QUEUE.Push(["Text",math,MathML]);
           }
         })();
    