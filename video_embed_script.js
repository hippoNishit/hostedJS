console.log(" Video Embed script hello");
var frames = document.getElementsByClassName('hippo-embed-frame');
var queryParams = window.location.search;
if(queryParams) {
    queryParams = queryParams.replace("?", ''); 
}
for(var j = 0; j < frames.length; j++) 
{
    var src = frames[j].src;
    if(src && queryParams) {
        if(src.indexOf('?') != -1)
        {
            frames[j].src = src + '&' + queryParams;
        }
        else
        {
            frames[j].src = src + '?' + queryParams;
        }
    }
    frames[j].addEventListener("load",initiateHippoVideo);
    window.addEventListener("message", (e) => {
        console.log("video_embed_script message received:", e);
        e.stopPropagation();
        var eventData;
        if(e.data){
            eventData = JSON.parse(e.data);
            console.log("eventData:", eventData);
        }
        if (eventData && eventData.type == 'video_delivery_view_loaded'){
            console.log("Got vdv loaded event!!");
            initiateHippoVideo();
        }
    });
}
function getCookie(name) 
{
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
function initiateHippoVideo()
{
    if(getCookie("hubspotutk"))
    {
        console.log("Got cookie:");
        var json = {appName:'hubspot',hubspotutk:getCookie("hubspotutk")};
        var frames = document.getElementsByClassName('hippo-embed-frame');
        for(var j = 0; j < frames.length; j++) 
        {
            if(!(frames[j].outerHTML.indexOf('first_name') != -1 && frames[0].outerHTML.indexOf('email') != -1 ))
            {
                if(document.getElementById("hv_video_delivery_embed") && document.getElementById("hv_video_delivery_embed").getAttribute("embed_type")
 === "hubspot") {
//                 if(document.getElementById("hv_video_delivery_embed") && document.getElementById("hv_video_delivery_embed").dataset.embed_type === "hubspot") {     
                    frames[j].contentWindow.postMessage(json, '*');
                }
                frames[j].removeEventListener("load",initiateHippoVideo);
            }
        }
        
    }
}
if(window.hippoEmbedSeo) {
    var client=new XMLHttpRequest;client.open("GET","https://s3.amazonaws.com/hippo-user-static/"+window.hippoEmbedSeo),client.onreadystatechange=function(){if(4===client.readyState&&200===client.status){var e=document.createElement("script");e.type="application/ld+json",e.innerHTML=client.responseText,document.getElementsByTagName("head")[0].appendChild(e)}},client.send();    
}
