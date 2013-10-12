describe('Heatmap', function() {

    console.log('starting');

    var el = document.createElement('div');
    el.id = 'map';
    document.body.appendChild(el);

    var map = L.map('map');

    var heatmap = new L.HeatmapLayer();
    
    it("Has loaded leaflet", function() {
        expect(typeof(map)).toBe('object');
    });
    
    it("Has loaded map plugin", function() {
        expect(typeof(heatmap)).toBe('object');
    });

    it("Has added the test points", function() {
        heatmap.addTestPoints();
        expect(heatmap.getLayers().length).toBe(100);
    });

});
