
          (function () {

           var QUEUE = MathJax.Hub.queue;
           var math = null;
           QUEUE.Push(function () {
             math = MathJax.Hub.getAllJax("previsualizar2")[0];
           });
           window.UpdateMath = function (MathML) {
               console.log(math);
             QUEUE.Push(["Text",math,MathML]);
           }
         })();
    