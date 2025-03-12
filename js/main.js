function murl(name, price,dat) {
    var purl = new URL("http://m.me/61573707718476")
    var params = new URLSearchParams(purl.search)
    params.set("text", name+"\n"+price+"\n"+dat)
    purl.search = params.toString()
    return purl.toString()
}



/// Slider

fetch("json/slider.json")
    .then(res => {
        if (!res.ok) {
            throw new Error("Network Error")
        }
        return res.json();
    })
    .then(data => {
        var slider = document.getElementById("heroCarousel")
        var i = 0
        var sld1 = `<div class="carousel-indicators">`
        var sld2 = `<div class="carousel-inner">`
        data.forEach(element => {
            sld1 += `<button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="${i}" class="${i == 0 ? "active" : ""}" aria-current="true" aria-label="Slide ${i}"></button>`
            sld2 += `<div class="carousel-item ${i == 0 ? "active" : ""}" data-bs-interval="4000"
                                    style="background: linear-gradient(to bottom, #8b3d9b, #26022d)">
                                    <div class="container">
                                        <img src="${element.desktop}" class="img-fluid d-lg-block d-md-block d-sm-block d-none"
                                            alt="Image">
                                        <img class="img-fluid d-lg-none d-md-none d-sm-none d-flex w-100"
                                            src="${element.mobile}" alt="" srcset="">
                                    </div>
                                </div>
                    `
            i++
        });
        var sld = sld1 + "</div>" + sld2 + "</div>"
        slider.innerHTML += sld

    })
    .catch(error => console.log(error));

/// Course

fetch("json/course.json")
    .then(res => {
        if (!res.ok) {
            throw new Error("Network Error")
        }
        return res.json();
    })
    .then(data1 => {
        var course = document.getElementById("programList")

        data1.forEach(element => {
            course.innerHTML += `<div class="col-lg-4 col-md-6 col-sm-6 rcourse" data-class=""
                                data-program="in-branch,online" data-payment="paid">
                                <div class="card shadow">
                                    <div class="card-header p-0">
                                        <img alt="image"
                                            data-cfsrc="${element.url}"
                                            style="display:none;visibility:hidden;"><noscript><img
                                                src="${element.url}"
                                                alt="image"></noscript>
                                    </div>
                                    <div class="card-body">
                                        <h3><span>${element.tittle}</span></h3>
                                        <h2><span>Price : ${element.price}</span></h2>
                                        <ul>${element.detail.map(item => "<li>" + item + "</li>").join("")}</ul>
                                    </div>
                                    <div
                                        class="card-footer text-center border-0 pb-3 d-flex justify-content-center align-items-center">
                                        <a class="btn btn-enroll btn-details shadow d-block"
                                            style="background: linear-gradient(to right, #0078FF,#840DC9) !important"
                                            href="${murl(element.tittle,element.price,"I want to know about this course .")}">Details</a>
                                        <a class="btn btn-enroll shadow"
                                            style="background: linear-gradient(to right, #EF512E,#DE0655) !important"
                                            href="${murl(element.tittle,element.price,"I want to buy this course .")}">Buy
                                            Now</a>
                                    </div>
                                </div>
                            </div>`
        });

    })
    .catch(error => console.log(error));

    /// Course

fetch("json/teacher.json")
.then(res => {
    if (!res.ok) {
        throw new Error("Network Error")
    }
    return res.json();
})
.then(data2 => {
    var panel = document.getElementById("panel")

    data2.forEach(element => {
        panel.innerHTML += `
                            <div class="col-md-4 testmonial udvash">
                                <div class="card text-center pt-2"
                                    style="background-color: #fefff6;box-shadow: inset 0px 3px 6px #b3c022;">
                                    <div class="card-header d-flex justify-content-center align-items-center border-0">
                                        <img src="${element.url}" alt="Image" style="border: 4px solid #b3c022;">
                                    </div>
                                    <div class="card-body">
                                        <h3>${element.name}</h3>
                                        <h5>ভর্তি পরীক্ষা : ${element.session}</h5>
                                        <h6 style="color: #b3c022;">${element.uni}</h6>
                                        <div class="quote" style="position: relative;">
                                            <span
                                                style="background-color: #b3c022;border-bottom: 15px solid #fefff6;"></span>
                                            <span
                                                style="background-color: #b3c022;border-bottom: 15px solid #fefff6;"></span>
                                        </div>
                                        <p>${element.detail}
                                        </p>
                                        <hr style="background-color: #b3c022;">
                                    </div>
                                </div>
                            </div>`
    });

})
.catch(error => console.log(error));