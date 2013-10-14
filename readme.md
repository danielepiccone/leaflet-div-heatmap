# Leaflet divHeatmap Layer

Lightweight implementation of an heatmap layer for leaflet using CSS3 and divIcon

##Use

```
var divHeatmapLayer = new L.DivHeatmapLayer();
```

###Options

```
{
    clickable: true or false, // divHeatmapLayer.on('click',function() {...});
    radius: 100,
    gradient: true or false, // Make solid blobs
    color: '255,0,0' or '#FF0000'
}
```

##Methods:

###.setData(data)
Loads an array of data points:

```
var data = [
{
    lat:10,
    lon:12,
    value:1
},
{
...
}
];
```
