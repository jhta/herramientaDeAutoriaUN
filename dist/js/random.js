/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function RoundInc(num,inc){
    var n = Math.abs(inc); // Change to positive
    var decimal = n - Math.floor(n);
    var cant = decimalPlaces(decimal);
    var mul=1;
    for(var i= 1;i<=cant;i++){
        mul*=10;
    }
    if(num % inc==0){
        return Math.round(num * mul) / mul;
    }else{
        var falta= num%inc;
        return Math.round((num+inc-falta) * mul) / mul;
    }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function decimalPlaces(num) {
    var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) { return 0; }
    return Math.max(
        0,
        // Number of digits right of decimal point.
            (match[1] ? match[1].length : 0)
            // Adjust for scientific notation.
            - (match[2] ? +match[2] : 0));
}

function posiblesValores(min,max,inc){
    var n = Math.abs(inc); // Change to positive
    var decimal = n - Math.floor(n);

    var cant = decimalPlaces(decimal);
    var mul=1;
    for(var i= 1;i<=cant;i++){
        mul*=10;
    }

    var string = "[ "+min+" ,";
    var acum = parseFloat(min);
    for(var i = 1;i<3;i++){
        acum+=parseFloat(inc);
        acum = Math.round(acum * mul) / mul;
        string = string +  " "+acum+" ,";
    }
    string = string + " ... , "+max+" ]";
    return string;
}

function posiblesValoresCategorica(array){
    if(array.length>1) {
        var string = "Posibles valores : [";
        console.log("tamano array "+array.length);
        var n = array.length;
        for (var i = 0; i < (array.length - 1); i++) {
            console.log(array[i].trim());
            if(!isEmpty(array[i].trim())) {
                console.log(array[i].trim().length);
                string = string + array[i].trim() + " , ";
            }else{
                console.log(array[i].trim() + "no paso");
            }
        }
        if(!isEmpty(array[array.length-1].trim())) {
            string = string + array[array.length - 1] + " ]";
        }else{
            string = string + " ]";
        }
        return string;
    }else
    return "";
}

function validarValoresCategorica(array){
    var array2 = [];
    if(array.length>1) {
        var n = array.length;
        for (var i = 0; i < array.length; i++) {
            if(!isEmpty(array[i].trim())) {
                if(array2[array[i].trim()]){
                    return false;
                }else{
                    array2[array[i].trim()] = array[i].trim();
                }
            }
        }
        return true;
    }else
        return false;
}

function validarValoresEspecifica(array){
    var array2 = [];
    if(array.length>1) {
        var n = array.length;
        for (var i = 0; i < array.length; i++) {
            if(!isEmpty(array[i].trim())) {
                if(isNumber(array[i].trim())) {
                    if (array2[array[i].trim()]) {
                        return false;
                    } else {
                        array2[array[i].trim()] = array[i].trim();
                    }
                }else{
                    return false;
                }
            }
        }
        return true;
    }else
        return false;
}

function isEmpty(str) {
    return (str.length === 0 || !str.trim());
}

function isNumber(n) {
    return (Object.prototype.toString.call(n) === '[object Number]' || Object.prototype.toString.call(n) === '[object String]') &&!isNaN(parseFloat(n)) && isFinite(n.toString().replace(/^-/, ''));
}