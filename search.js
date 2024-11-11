
fetch('https://firebas-76710-default-rtdb.firebaseio.com/product.json')
            .then(res=>res.json())
            .then(json=>console.log(json))