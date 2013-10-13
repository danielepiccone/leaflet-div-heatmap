/*
 *
 * Leaflet Heatmap Layer
 * 
 * */


L.HeatmapLayer = L.FeatureGroup.extend({
    options: {
        color: '#00ee44',
        radius: 100,
        gradient: true,
        clickable: false
    },

    initialize: function(options){
        L.Util.setOptions(this, options);
        this._layers = {};

        // Define CSS rule for making heatmap invisible to clicking
        var style = document.createElement('style');
        document.head.appendChild(style);

        // Make the heatmap invisible to clicking 
        //style.appendChild(document.createTextNode(''));
        //var sheet = style.sheet;
        //sheet.insertRule(".leaflet-heatmap-blob { pointer-events:none }", 0);
    },

    _parseColor: function (color) {
        m = color.match(/^#([0-9a-f]{6})$/i);
        if(m) {
            return (parseInt(m[1].substr(0,2),16) + ',' + parseInt(m[1].substr(2,2),16)+ ',' + parseInt(m[1].substr(4,2),16));
        }else{
            return color;
        }
    },

    _addBlob: function(lat,lng,value){
        if (!value || !lat || !lng) {
            throw new Error('Provide a latitude, longitude and a value');
        }

        if (value > 1 || value < 0) {
            throw new Error('Value should be beetween 0 and 1');
        }

        // Define the marker
        var alpha_start = value,
            alpha_end = !this.options.gradient ? value : 0,
            opacity = value;


        var gradient =  'radial-gradient(closest-side, rgba('+ this._parseColor(this.options.color) +', '+alpha_start+') 0%, rgba('+ this._parseColor(this.options.color) +', '+alpha_end+') 100%)';
        var html = '<div class="heatblob" data-value="'+value+'" style="width:100%;height:100%;border-radius:50%;background-image:'+gradient+'">';
        var size = this.options.radius * value;
        
        L.marker([lat, lng], {
            icon: L.divIcon({
                iconSize: [ size, size ],
                className: 'leaflet-heatmap-blob',
                html: html
            }),
            clickable: this.options.clickable,
            keyboard: false,
            opacity: opacity
        }).addTo(this);
    },

    setData: function(data) {
        // Data object is three values [ {lat,lon,value}, {...}, ...]
        this.clearLayers();
        var self = this;
        data.forEach(function(point){
            point.value = point.value > 1 ? 1 : point.value;
            self._addBlob(point.lat,point.lon,point.value);
        });
    },

    /*
    * Testing
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

