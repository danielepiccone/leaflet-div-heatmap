/*
 *
 * Leaflet Heatmap Layer
 * 
 * */


L.HeatmapLayer = L.FeatureGroup.extend({
    options: {
        color: '200,20,20',
        radius: 100
    },

    initialize: function(options){
        L.Util.setOptions(this, options);
        this._layers = {};

        // Define CSS rule for making heatmap invisible to clicking
        var style = document.createElement('style');
        document.head.appendChild(style);
        // Apparently some version of Safari needs the following line? I dunno.
        style.appendChild(document.createTextNode(''));
        var sheet = style.sheet;
        sheet.insertRule(".leaflet-heatmap-blob { pointer-events:none }", 0);
    },

    _parseColor: function (color) {
        m = color.match(/^#([0-9a-f]{6})$/i);
        if(m) {
            return (parseInt(m.substr(0,2),16) + ',' + parseInt(m.substr(2,2),16)+ ',' + parseInt(m.substr(4,2),16));
        }else{
            return color;
        }
    },

    _addBlob: function(lat,lng,value){
        if (!value || !lat || !lng) {
            throw new Error('Provide a latitude, longitude and a value');
        }
        
        //value = value > 1 ? 1 : value;
        var size = this.options.radius * value;
        //value = 1;
        L.marker([lat, lng], {
            icon: L.divIcon({
                iconSize: [ size, size ],
                className: 'leaflet-heatmap-blob',
                html: '<div class="heatblob" data-value="'+value+'" style="width:100%;height:100%;border-radius:50%;background-image: radial-gradient(closest-side, rgba('+ this._parseColor(this.options.color) +', '+value+') 0%, rgba('+ this._parseColor(this.options.color) +', 0) 100%)">'
            }),
            clickable: false,
            keyboard: false,
            opacity: value
        }).addTo(this);
    },

    setData: function(data) {
        // Data object is three values [{lat,lon,value}]
        this.clearLayers();
        var self = this;
        data.forEach(function(point){
            point.value = point.value > 1 ? 1 : point.value;
            self._addBlob(point.lat,point.lon,point.value);
        });
    },

    /*
    * Debug
    */

    addTestPoints: function(number) {
        var count = number || 100;
        while (count-- > 0) {
            var size = Math.round(Math.random() * 150);	// in pixels
            var value = Math.random();	// 0 - 1 (opacity)
            var lat = 90 * Math.random();
            var lng = 180 * Math.random();
            this._addBlob(lat,lng,value);
        }
    },

});

