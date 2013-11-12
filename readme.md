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

###.getData()
Returns the dataset in the heatmap.

###.clearData()
Clears all the data.

###.morphData(data)
Load a new dataset performing a fadeOut on the old data and a fadeIn on the new data.

###.fadeInData(data)
Loads an array of data points fading.

###.fadeOutData()
Removes the current data making it fade out.


## To Do

- Callbacks for animations
- Support for CSS animations

