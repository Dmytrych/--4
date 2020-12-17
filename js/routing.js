export async function loadContent(){
    let routeArgs = parseRoute(window.location.hash)
    let path = routeArgs.length > 1 ? routeArgs[0] + "/" + routeArgs[1] : "#/home"
    routeArgs.splice(0, 2)
    return await getPageContent(path, routeArgs)
}

function parseRoute(routeString){
    return routeString.split('/')
}

async function getPageContent(route, routeArgs){
    let markup;
    switch (route){
    case "#/catalog":
        markup = await catalog(routeArgs)
        break;
    case "#/product":
        markup = product()
        break;
    case "#/order":
            markup = order()
            break;
    default:
        markup = home()
        break;
    }

    return markup
}

function order(){
    let request = new XMLHttpRequest()
    let markup;
    request.open('GET', './partialViews/orderView.html', false)
    request.send()

    if(request.status == 200){
        markup = request.responseText;
    }
    return markup
}

function product(){
    let request = new XMLHttpRequest()
    let markup;
    request.open('GET', './partialViews/productView.html', false)
    request.send()

    if(request.status == 200){
        markup = request.responseText;
    }
    return markup
}

async function catalog(args){
    let request = new XMLHttpRequest()
    let markup;
    let itemsMarkup = "";
    request.open('GET', './partialViews/catalogView.html', false)
    request.send()

    if(request.status == 200){
        markup = request.responseText;
    }

    let products = await getProducts(args[0])
    products.forEach(element => {
        itemsMarkup += ` <div class="product-box m-2">
        <div class="">
            <div class="image-box" style="background-image: url(./images/${element.Name.replaceAll(" ", "_")}.jpg);">
                
            </div>
        </div>
        <div class="product-info">
            <div class="product-title font-italic font-weight-bold">
                <h4>${element.Name}</h4>
            </div>
            <div class="product-description font-weight-light text-left">
                <h6>Descriprion: </h6>
                ${element.info}
            </div>
            <div class="d-flex justify-content-center">
                <div class="quantity-select-section">
                    <div class="add-button">
                        <button type="button add-button" class="btn btn-primary" onclick="">Add to cart</button>
                    </div>
                    <div class="quantity-input">
                        <input class="form-control" type="number" value="1" id="product-id${element.id}-quantity"></input>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    });
    markup = markup.replace("<renderPlace/>", itemsMarkup)

    return markup
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function getProducts(argument){
    let productTypes = [
        "pizza",
        "burgers",
        "drinks"
    ]
    let selectedType = productTypes.includes(argument) ? argument : productTypes[0]
    let response = fetch(`https://my-json-server.typicode.com/Dmytrych/demo/${selectedType}`)
        .then(response => response.json()).then(data => {return data})

    return response
}

function home(){
    let request = new XMLHttpRequest()
    let markup;
    request.open('GET', './partialViews/indexView.html', false)
    request.send()

    if(request.status == 200){
        markup = request.responseText;
    }
    return markup
}